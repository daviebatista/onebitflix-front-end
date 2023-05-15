import styles from "../styles/search.module.scss";
import Head from "next/head";
import HeaderAuth from "../src/components/common/headerAuth";
import { useRouter } from "next/router";
import { useState, useEffect } from 'react'
import courseService, { CourseType } from "@/services/courseService";
import { Container } from "reactstrap";
import SearchCard from "@/components/searchCard";
import Footer from "@/components/common/footer";
import PageSpinner from "@/components/common/spinner";

const Search = function () {
    const router = useRouter()
    const searchName: any = router.query.name
    const [searchResult, setSerachResult] = useState<CourseType[]>([])

    const searchCourses = async function    ()  {
        if(typeof searchName === 'string') {
            const response = await courseService.getSearch(searchName)

            setSerachResult(response.data.courses)
        }
    }

    useEffect(()    =>  {
        searchCourses()
    }, [searchName])

    const [loading, setLoading] = useState(true)

    useEffect(()    =>  {
        if  (!sessionStorage.getItem('onebitflix-token'))  {
            router.push('/login')
        }   else   {
            setLoading(false)
        }
    }, [])

    if(loading) {
        return <PageSpinner/>
    }

    return (
            <>
                <Head>
                    <title>Veritas - {searchName}</title>
                    <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
                </Head>
                <main className={styles.main}>
                    <div className={styles.header}>
                    <HeaderAuth />
                    </div>
                    <section className={styles.mainContent}>
                    {searchResult.length >= 1 ? (
                        <Container className="d-flex flex-wrap justify-content-center gap-5 py-4">
                        {searchResult?.map((course) => (
                            <SearchCard key={course.id} course={course} />
                        ))}
                        </Container>
                    ) : (
                        <p className={styles.noSearchResult}>Nenhum resultado encontrado!</p>
                    )}
                    </section>
                    <div className={styles.footer}>
                    <Footer />
                    </div>
                </main>
            </>
    )
}

export default Search