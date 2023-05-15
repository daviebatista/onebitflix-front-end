import Footer from "@/components/common/footer"
import HeaderAuth from "@/components/common/headerAuth"
import PageSpinner from "@/components/common/spinner"
import FavoritesCategory from "@/components/homeAuth/favoriteCategory"
import FeaturedCategory from "@/components/homeAuth/featuredCategory"
import FeaturedSection from "@/components/homeAuth/featuredSection"
import ListCategories from "@/components/homeAuth/listCategories"
import NewestCategory from "@/components/homeAuth/newestCategory"
import Head from "next/head"
import { useRouter } from "next/router"
import { useState, useEffect} from 'react'

const HomeAuth = function   ()  {
    const router = useRouter()
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
                        <FeaturedCategory/>
                        <ListCategories/>
                        <Footer/>
                    </main>
                </>
    )
}

export default HomeAuth