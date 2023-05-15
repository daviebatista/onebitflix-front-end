import api from "./api";

interface watchTimeParams   {
    episodeId: number
    seconds: number
}

const watchEpisodeService = {
    getWatchTime: async (episodeId: number)  =>  {
        const token = sessionStorage.getItem('onebitflix-token')

        const response = await api.get(`/episodes/${episodeId}/watchTime`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).catch((error) => {
            return error.response
        })

        return response 
    },
    setWatchTime: async ({episodeId, seconds}: watchTimeParams)  =>  {
        const token = sessionStorage.getItem('onebitflix-token')

        const response = await api.post(`/episodes/${episodeId}/watchTime`, {seconds}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).catch((error) => {
            return error.response
        })

        return response 
    },

}

export default watchEpisodeService;