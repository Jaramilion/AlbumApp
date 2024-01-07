import axios from "axios"

const BASE_URL='https://jsonplaceholder.typicode.com/'

export const getUsers = async () :Promise<Users> => {
    const {data} = await axios.get<Users>(`${BASE_URL}/users`)
    return data
}

export const getAlbumByUser = async (userId:number):Promise<Albums>=>{
    const {data} = await axios.get<Albums>(`${BASE_URL}/albums?userId=${userId}`)
    return data
}