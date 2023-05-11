import Head from "next/head";
import styles from '../styles/HomeNoAuth.module.scss';
import HeaderNoAuth from "@/components/homeNoAuth/headerNoAuth";
import PresentationSection from "@/components/homeNoAuth/presentationSection";
import CardsSection from "@/components/homeNoAuth/cardsSection";
import SlideSection from "@/components/homeNoAuth/slideSection";
import { GetStaticProps } from "next";
import courseService, { CourseType } from "@/services/courseService";
import { ReactNode } from "react";
import Footer from "@/components/common/footer";

interface IndexPageProps    {
    children?: ReactNode;
    course: CourseType[];
}

const HomeNoAuth = ({course}: IndexPageProps)   =>  {
    return (
        <>
            <Head>
                <title>Veritas</title>
                <link rel="icon" href="/favicon.png" type="image/x-icon" />
                <meta property="og:title" content="Veritas Learning" key="title"/>
				<meta name="description" content="Tenha acesso às melhores aulas da história e da filosofia."/>
            </Head>
            <main>
                <div className={styles.sectionBackground}>
                    <HeaderNoAuth/>
                    <PresentationSection/>
                </div>
                <CardsSection/>
                <SlideSection newestCourses={course}/>
                <Footer/>
            </main>
        </>
    )
};

export const getStaticProps: GetStaticProps = async ()  =>  {
    const response = await courseService.getNewestCourses()
    return  {
        props:{
            course: response.data
        },
        revalidate: 3600 * 24
    }
}

export default HomeNoAuth