import HeaderAuth from "@/components/common/headerAuth"
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
                    </main>
                </>
    )
}

export default HomeAuth