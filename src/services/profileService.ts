import api from "./api";

interface UserParams    {
    firstName: string
    lastName: string
    phone: string
    email: string
    created_at: string
}

interface PasswordParams {
    currentPassword: string;
    newPassword: string;
}

const profileService    =   {
    // Pegar dados do usuário logado
    fetchCurrent: async ()  =>  {
        const token = sessionStorage.getItem('onebitflix-token')

        const response = await api.get('/users/current',    {
            headers:    {
                Authorization:  `Bearer ${token}`
            }
        }).catch((error)    =>  {
            return error.response
        })

        return response.data
    },
    // Atualizar informações do usuário
    userUpdate: async (params: UserParams)  =>  {
        const token = sessionStorage.getItem('onebitflix-token')

        const response = await api.put('/users/current', params,    {
            headers:    {
                Authorization:  `Bearer ${token}`
            }
        }).catch((error)    =>  {
            if(error.response.status === 400 || error.response.status === 401)  return error.response
            return error
        })

        return response.status
    },
    // Alteração de senha //
    passwordUpdate: async (params: PasswordParams)  =>  {
        const token = sessionStorage.getItem('onebitflix-token')

        const response = await api.put('/users/current/password', params,    {
            headers:    {
                Authorization:  `Bearer ${token}`
            }
        }).catch((error)    =>  {
            if(error.response.status === 400 || error.response.status === 401)  return error.response
            return error
        })

        return response.status
    }

}

export default profileService