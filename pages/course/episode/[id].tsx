import { useRouter } from "next/router";
import styles from "../../../styles/episodePlayer.module.scss";
import Head from "next/head";
import HeaderGeneric from "@/components/common/headerGeneric";
import { useState, useEffect, useRef } from 'react';
import courseService, { CourseType } from "@/services/courseService";
import PageSpinner from "@/components/common/spinner";
import { Button, Container } from "reactstrap";
import ReactPlayer from "react-player";
import Footer from "@/components/common/footer";
import watchEpisodeService from "@/services/episodeService";

const EpisodePlayer = function () {
    const router = useRouter()
    const [course, setCourse] = useState<CourseType>()
    const [isReady, setIsReady] = useState(false)
    const episodeOrder = parseFloat(router.query.id?.toString() || "");
    const episodeId = parseFloat(router.query.episodeid?.toString() || "");
    const courseId = router.query.courseid?.toString() || "";

    const [getEpisodeTime, setGetEpisodeTime] = useState(0)
    const [episodeTime, setEpisodeTime] = useState(0)

    const [loading, setLoading] = useState(true)
    const playerRef = useRef<ReactPlayer>(null)

    //Busca do curso
    const getCourse = async function () {
        if(typeof courseId !== 'string') return

        const response = await courseService.getEpisodes(courseId)

        if  (response.status === 200)   {
            setCourse(response.data)
        }
    }

    useEffect(()    =>  {
        getCourse()
    }, [courseId])

    useEffect(()    =>  {
        if  (!sessionStorage.getItem('onebitflix-token'))  {
            router.push('/login')
        }   else   {
            setLoading(false)
        }
    }, [])

    //Pegar o tempo do episódio
    const handleGetEpisodeTime = async () =>    {
            const response = await watchEpisodeService.getWatchTime(episodeId)
    
            if  (response.data !== null)    {
                setGetEpisodeTime(response.data.seconds)
            }
    }

    useEffect(()    =>  {
        handleGetEpisodeTime()
    }, [router])

    if(loading) {
        return <PageSpinner/>
    }

    //Settar o tempo do episódio
    const handleSetEpisodeTime = async () =>    {
        await watchEpisodeService.setWatchTime({
            episodeId: episodeId,
            seconds: Math.round(episodeTime)
        })
    }

    const handlePlayerTime = () =>  {
        playerRef.current?.seekTo(getEpisodeTime)
        setIsReady(true)
    }

    if  (isReady === true)    {
        setTimeout(()   =>  {
            handleSetEpisodeTime()
        }, 1000 * 3)
    }









    //Verificação de se está no último ep
    const handleLastEpisode = () => {
        router.push(`/course/episode/${episodeOrder - 1}?courseid=${course?.id}&episodeid=${episodeId - 1}`)
    }

    //Verificação para ver se há próximo episódio
    const handleNextEpisode = () => {
        router.push(`/course/episode/${episodeOrder + 1}?courseid=${course?.id}&episodeid=${episodeId + 1}`)
    }


    if  (course?.episodes === undefined) return <PageSpinner/>

    if  (episodeOrder + 1 < course?.episodes?.length)  {
        if(Math.round(episodeTime) === course.episodes[episodeOrder].secondsLong)   {
            handleNextEpisode()
        }
    }




    return (
        <>
        <Head>
            <title>Veritas - {course.episodes[episodeOrder].name}</title>
            <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
        </Head>
        <main>
            <HeaderGeneric logoUrl="/home" btnContent={"Voltar ao curso"} btnUrl={`/course/${courseId}`} />
            <Container className="d-flex flex-column align-items-center gap-3 pt-5">
                <p className={styles.episodeTitle}>
                    {course.episodes[episodeOrder].name}
                </p>
                {typeof window == "undefined" ? null : (
                    <ReactPlayer
                    className={styles.player}
                    url={`${
                        process.env.NEXT_PUBLIC_BASEURL
                    }/episodes/stream?videoUrl=${
                        course.episodes[episodeOrder].videoUrl
                    }&token=${sessionStorage.getItem("onebitflix-token")}`}
                        controls
                        ref={playerRef}
                        onStart={handlePlayerTime}
                        onProgress={(progress)=>{
                            setEpisodeTime(progress.playedSeconds)
                        }}
                    />
                )}
                    <div className={styles.episodeButtonDiv}>
                        <Button
                        className={styles.episodeButton}
                        disabled={episodeOrder === 0 ? true : false}
                        onClick={handleLastEpisode}
                        ><img src="/episode/iconArrowLeft.svg" alt="setaEsquerda" className={styles.arrowImg}/></Button>
                        <Button 
                        className={styles.episodeButton}
                        disabled={episodeOrder + 1 === course.episodes.length ? true : false}
                        onClick={handleNextEpisode}
                        ><img src="/episode/iconArrowRight.svg" alt="setaDireita" className={styles.arrowImg}/></Button>
                    </div>
                    <p className="text-center py-4">
                        {course.episodes[episodeOrder].synopsis}
                    </p>
            </Container>
            <Footer/>
        </main>
        </>
    )
}

export default EpisodePlayer;