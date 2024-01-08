import axios, { AxiosRequestConfig } from "axios"
import { Albums, Users, PhotosByAlbum } from "../types/apiTypes"

const BASE_URL='https://jsonplaceholder.typicode.com/'
const config: AxiosRequestConfig = {
    timeout:3500
}
export const getUsers = async () :Promise<Users> => {
    const {data} = await axios.get<Users>(`${BASE_URL}users`,config)
    return data
}

export const getAlbumByUser = async (userId:number):Promise<Albums>=>{
    const {data} = await axios.get<Albums>(`${BASE_URL}albums?userId=${userId}`, config)
    return data
}
export const getPhotosByAlbumId = async(albumId: number):Promise<PhotosByAlbum>=>{
    const {data} =await axios.get<PhotosByAlbum>(`${BASE_URL}photos?albumId=${albumId}`, config)
    return data
}

export const getAllPhotosAlbum = async():Promise<PhotosByAlbum>=>{
    const {data} =await axios.get<PhotosByAlbum>(`${BASE_URL}photos`, config)
    return data
}