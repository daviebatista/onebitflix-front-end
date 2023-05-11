import Head from "next/head";
import React from 'react'
import styles from '../styles/HomeNoAuth.module.scss';
import HeaderNoAuth from "@/components/homeNoAuth/headerNoAuth";
import PresentationSection from "@/components/homeNoAuth/presentationSection";
import CardsSection from "@/components/homeNoAuth/cardsSection";
import SlideSection from "@/components/homeNoAuth/slideSection";
import { GetStaticProps } from "next";
import courseService, { CourseType } from "@/services/courseService";
import { ReactNode } from "react";
import Footer from "@/components/common/footer";
import AOS from "aos";
import 'aos/dist/aos.css';

interface IndexPageProps    {
    children?: ReactNode;
    course: CourseType[];
}

const HomeNoAuth = ({course}: IndexPageProps)   =>  {

    React.useEffect(() => {
        AOS.init();
    }, []);

    return (
        <>
            <Head>
                <title>Veritas</title>
                <link rel="icon" href="/favicon.png" type="image/x-icon" />
                <meta property="og:title" content="Veritas Learning" key="title"/>
				<meta name="description" content="Tenha acesso às melhores aulas da história e da filosofia."/>
            </Head>
            <main>
                <div className={styles.sectionBackground}    data-aos="fade-zoom-in" data-aos-duration="1600">
                    <HeaderNoAuth/>
                    <PresentationSection/>
                </div>
                <div data-aos="fade-right" data-aos-duration="1200">
                    <CardsSection/>
                </div>
                <div data-aos="fade-right" data-aos-duration="1200">
                    <SlideSection newestCourses={course}/>
                </div>
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