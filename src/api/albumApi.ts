import axios, { AxiosRequestConfig } from "axios"

const BASE_URL='https://jsonplaceholder.typicode.com/'
const config: AxiosRequestConfig = {
    timeout:3500
}
export const getUsers = async () :Promise<Users> => {
    const {data} = await axios.get<Users>(`${BASE_URL}/users`,config)
    return data
}

export const getAlbumByUser = async (userId:number):Promise<Albums>=>{
    const {data} = await axios.get<Albums>(`${BASE_URL}/albums?userId=${userId}`, config)
    return data
}