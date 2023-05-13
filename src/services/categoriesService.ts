import api from "./api";
import { CourseType } from "./courseService";

export type CategoryType    =   {
    id: number
    name: string
    position: number
    courses?: CourseType[]
}

const categoriesService =   {
    //Buscar as categorias//
    getCategories: async    ()  =>  {
        const token = sessionStorage.getItem('onebitflix-token')

        const response = await api.get('/categories', {
            headers:    {
                Authorization: `Bearer ${token}`
            }
        }).catch((error)    =>  {
            return error.response
        })

        return response
    },
    //Buscar os cursos//
    getCourses: async    (id: number)  =>  {
        const token = sessionStorage.getItem('onebitflix-token')

        const response = await api.get(`/categories/${id}`, {
            headers:    {
                Authorization: `Bearer ${token}`
            }
        }).catch((error)    =>  {
            return error.response
        })

        return response
    }
}

export default categoriesService