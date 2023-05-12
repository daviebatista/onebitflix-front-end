import api from "./api"

interface RegisterParams    {
    firstName:  string
    lastName:   string
    phone:      string
    birth:      string
    email:      string
    password:   string
}

const authService   =   {
    register: async (params: RegisterParams)  =>  {
        const response  =   await api.post('/auth/register', params).catch((error)  =>  {
            if  (error.response.status  === 400) return error.response
            return error
        })
        
        return response
    },
}

export default authService