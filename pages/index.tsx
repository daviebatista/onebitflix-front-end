import Head from "next/head";
import styles from '../styles/HomeNoAuth.module.scss';
import HeaderNoAuth from "@/components/homeNoAuth/headerNoAuth";
import PresentationSection from "@/components/homeNoAuth/presentationSection";
import CardsSection from "@/components/homeNoAuth/cardsSection";

const HomeNoAuth = ()   =>  {
    return (
        <>
            <Head>
                <title>Veritas</title>
                <link rel="icon" href="/favicon.png" type="image/x-icon" />
                <meta property="og:title" content="Onebitflix" key="title"/>
				<meta name="description" content="Tenha acesso às melhores aulas da história e da filosofia."/>
            </Head>
            <main>
                <div className={styles.sectionBackground}>
                    <HeaderNoAuth/>
                    <PresentationSection/>
                </div>
                <CardsSection/>
            </main>
        </>
    )
}

export default HomeNoAuth