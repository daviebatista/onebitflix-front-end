import api from "./api";

export type EpisodeType =   {
    id: number,
    name: string,
    synopsis: string,
    order: number,
    videoUrl: string,
    secondsLong: number
}

export type CourseType  =   {
    id: number,
    name: string,
    thumbnailUrl: string,
    synopsis: string;
    episodes?:  EpisodeType[]
}

const courseService =   {
    getNewestCourses: async  ()  =>  {
        const response = await api.get('/courses/newest').catch((error) =>  {
            return error.response.data
        })

        return response
    },
    getFeaturedCourses: async () => {
        const token = sessionStorage.getItem('onebitflix-token')

        const response = await api.get('/courses/featured', {
            headers:    {
                Authorization: `Bearer ${token}`,
            },
        }).catch((error)    =>  {
            return error.response
        })
        return response
    },
    addToFavorites:   async   (courseId: number | string)  =>  {
        const token = sessionStorage.getItem('onebitflix-token')

        const response = await api.post('/favorites',   {
            headers:    {
                Authorization: `Bearer ${token}`
            }
        }).catch(error =>  {
            return error.response
        })
        return response
    },
    removeFromFavorites:    async   (courseId: number | string) =>  {
        const token = sessionStorage.getItem('onebitflix-token')

        const response = await api.delete('/favorites', {
            headers:    {
                Authorization: `Bearer ${token}`
            },
            data:   {   courseId   },
        }).catch((error)    =>  {
            return error.response
        })
    },
    getFavoriteCourses: async   (courseId: number | string) =>  {
        const token = sessionStorage.getItem('onebitflix-token')

        const response = await api.get('/favorites', {
            headers:    {
                Authorization: `Bearer ${token}`
            }
        }).catch((error)    =>  {
            return error.response
        })
        return response
    }
}

export default courseService

