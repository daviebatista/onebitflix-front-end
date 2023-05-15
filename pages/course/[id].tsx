import HeaderAuth from "@/components/common/headerAuth";
import styles from "../../styles/coursePage.module.scss";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from 'react'
import courseService, { CourseType } from "@/services/courseService";
import { Button, Container } from "reactstrap";
import Footer from "@/components/common/footer";
import PageSpinner from "@/components/common/spinner";
import EpisodeList from "@/components/episodeList";

const CoursePage = function () {
    const [course, setCourse] = useState<CourseType>()
    const [liked, setLiked] = useState(false)
    const [favorited, setFavorited] = useState(false)

    const router = useRouter()
    const {id} = router.query

    const getCourse = async function () {
        if (typeof id !== "string") return
    
        const response = await courseService.getEpisodes(id)
        if (response.status === 200) {
            setCourse(response.data);
            setLiked(response.data.liked);
            setFavorited(response.data.favorited);
        }
    }

    const handleLikeCourse = async () => {
        if (typeof id !== "string") return
        if (liked === true) {
            await courseService.removeLikeFromCourse(id)
            setLiked(false);
        } else {
            await courseService.addLikeToCourse(id)
            setLiked(true)
        }
    }

    const handleFavCourse = async () => {
        if (typeof id !== "string") return
        if (favorited === true) {
            await courseService.removeFromFavorites(id);
            setFavorited(false);
        } else {
            await courseService.addToFavorites(id);
            setFavorited(true);
        }
    };

    useEffect(()    =>  {
        getCourse()
    }, [id])

    if(course === undefined) return <PageSpinner/>;


    return (
        <>
            <Head>
                <title>Veritas - {course?.name}</title>
                <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
            </Head>
            <main>
                <div
                    style={{
                        backgroundImage: `linear-gradient(to bottom, #6666661a, #151515),
                        url(${process.env.NEXT_PUBLIC_BASEURL}/${course?.thumbnailUrl})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        minHeight: "550px",
                    }}
                >
                    <HeaderAuth />
                </div>
                <Container className={styles.courseInfo}>
                    <p className={styles.courseTitle}>{course?.name}</p>
                    <p className={styles.courseDescription}>{course?.synopsis}</p>
                    <Button outline className={styles.courseBtn} disabled={course?.episodes?.length === 0 ? true : false}>
                        ASSISTIR AGORA!
                        <img
                        src="/playButton.png"
                        alt="buttonImg"
                        className={styles.buttonImg}
                        />
                    </Button>
                        <div className={styles.interactions}>
                            {liked === false ? (
                                <img
                                    src="/course/iconLike.svg"
                                    alt="likeImage"
                                    className={styles.interactionImages}
                                    onClick={handleLikeCourse}
                                />
                            ) : (
                                <img
                                    src="/course/iconLiked.svg"
                                    alt="likedImage"
                                    className={styles.interactionImages}
                                    onClick={handleLikeCourse}
                                />
                            )}
                            {favorited === false ? (
                                <img
                                    onClick={handleFavCourse}
                                    src="/course/iconAddFav.svg"
                                    alt="addFav"
                                    className={styles.interactionImages}
                                />
                            ) : (
                                <img
                                    onClick={handleFavCourse}
                                    src="/course/iconFavorited.svg"
                                    alt="favorited"
                                    className={styles.interactionImages}
                                />
                            )}
                        </div>
                </Container>
                <Container className={styles.episodeInfo}>
                    <p className={styles.episodeDivision}>EPISÓDIOS</p>
                    <p className={styles.episodeLength}>
                        {course?.episodes?.length} episódios
                    </p>
                    {course?.episodes?.length === 0 ? (
                        <p>Ops! Ainda não temos episódios neste curso.</p>
                    ) : (
                        course?.episodes?.map((episode)    =>  (
                            <EpisodeList key={episode.id} episode={episode}/>
                        ))
                    )}
                </Container>
                <Footer/>
            </main>
        </>
    )
};

export default CoursePage