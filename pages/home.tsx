import Footer from "@/components/common/footer"
import HeaderAuth from "@/components/common/headerAuth"
import FavoritesCategory from "@/components/homeAuth/favoriteCategory"
import FeaturedSection from "@/components/homeAuth/featuredSection"
import NewestCategory from "@/components/homeAuth/newestCategory"
import Head from "next/head"

const HomeAuth = function   ()  {
    return  (
                <>
                    <Head>
                        <title>Veritas - Home</title>
                        <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
                    </Head>
                    <main>
                        <FeaturedSection/>
                        <NewestCategory/>
                        <FavoritesCategory/>

                        <Footer/>
                    </main>
                </>
    )
}

export default HomeAuth