import HeaderAuth from "@/components/common/headerAuth";
import styles from "../../styles/coursePage.module.scss";
import Head from "next/head";

import { useRouter } from "next/router";
import { useState, useEffect } from 'react'

import courseService, { CourseType } from "@/services/courseService";

const CoursePage = function () {
    const [course, setCourse] = useState<CourseType>()
    const router = useRouter()
    const { id } = router.query

    const getCourse = async function () {
        if(typeof id !== 'string') return

        const response = await courseService.getEpisodes(id)

        if  (response.status === 200)   {
            setCourse(response.data)
        }
    }

    useEffect(() => {
        getCourse()
    }, [id])


    return (
        <>
            <Head>
                <title>Veritas - {course?.name}</title>
                <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
            </Head>
            <main>
                <HeaderAuth />
                <p>{course?.name}</p>
            </main>
        </>
    );
};

export default CoursePage;