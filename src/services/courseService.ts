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
    //Pegar os cursos mais recentes//
    getNewestCourses: async  ()  =>  {
        const response = await api.get('/courses/newest').catch((error) =>  {
            return error.response.data
        })

        return response
    },
    //Pegar os cursos em destaque//
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
    //Adicionar um curso aos favoritos//
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
    //Remover um curso dos favoritos do usuário//
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
    //Pegar os cursos favoritos do usuário//
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
    },
    addLikeToCourse: async (courseId: number | string) => {
        const token = sessionStorage.getItem("onebitflix-token")
    
        const res = await api.post("/likes", { courseId }, {
                headers: {
                Authorization: `Bearer ${token}`,
            },
        }).catch((error) => {
            console.log(error.response.data.message);
        
            return error.response;
        })
    
        return res;
    },
    removeLikeFromCourse: async   (courseId: number | string) =>  {
        const token = sessionStorage.getItem('onebitflix-token')

        const response = await api.delete(`/likes/${courseId}`, {
            headers:    {
                Authorization: `Bearer ${token}`
            }
        }).catch((error)    =>  {
            return error.response
        })
        
        return response
    },
    //Pesquisa de cursos//
    getSearch:  async   (name: string)  =>  {
        const token = sessionStorage.getItem('onebitflix-token')

        const response = await api.get(`/courses/search?name=${name}`, {
            headers:    {
                Authorization: `Bearer ${token}`
            }
        }).catch((error)    =>  {
            return error.response
        })

        return response
    },
    getEpisodes:  async   (id: number | string)  =>  {
        const token = sessionStorage.getItem('onebitflix-token')

        const response = await api.get(`/courses/${id}`, {
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

