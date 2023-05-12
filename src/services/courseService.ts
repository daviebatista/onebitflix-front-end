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
            console.log(error.response.data.message)

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
            console.log(error.response.data.message)

            return error.response
        })
        return response
    },
}

export default courseService

