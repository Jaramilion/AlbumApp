import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { RootState } from '..'
import { AlbumData } from '../../types/albumTypes'
import STATUSES from '../../types/statuses'
import { PhotosByAlbum } from '../../types/apiTypes'

interface albumState {
    albumData: AlbumData,
    albumDataStatus: STATUSES,
    photosByAlbumStatus: STATUSES,
    photosByAlbum: PhotosByAlbum 
    allPhotosStatus: STATUSES
    displayAllPhotos: boolean
}

const initialState: albumState = {
    albumData : [],
    albumDataStatus : STATUSES.DEFAULT,
    photosByAlbumStatus: STATUSES.DEFAULT,
    photosByAlbum: [],
    allPhotosStatus: STATUSES.DEFAULT,
    displayAllPhotos:false

}
export const albumSlice = createSlice({
    name:'album',
    initialState,
    reducers:{
        getAlbumsData: (state) => {
            return {...state, albumDataStatus: STATUSES.LOADING}
        },
        getAlbumsDataSuccess: (state, action: PayloadAction<AlbumData>)=>{
            return {...state, albumData: [...action.payload], albumDataStatus:STATUSES.SUCCESS   }
        },
        getAlbumsDataFailure: (state)=>{
            return {...state, albumDataStatus: STATUSES.FAILURE   }
        },
        deleteAlbumFromUser: (state, action:PayloadAction<{userId:number, albumId:number}>)=>{
            const userIndex = state.albumData.findIndex(u=>u.id===action.payload.userId)
            const userAlbumIndex = state.albumData[userIndex].data.findIndex(a=>a.id===action.payload.albumId)
            state.albumData[userIndex].data.splice(userAlbumIndex,1) 
        },
        getPhotosByAlbum: (state, action:PayloadAction<number>)=>{
            return {...state, photosByAlbumStatus: STATUSES.LOADING}
        },
        getPhotosByAlbumSuccess: (state, action: PayloadAction<PhotosByAlbum>)=>{
            return {...state, photosByAlbum: [...action.payload] ,photosByAlbumStatus: STATUSES.SUCCESS}
        },
        getPhotosByAlbumFailure: (state)=>{
            return {...state, photosByAlbumStatus: STATUSES.FAILURE}
        },
        resetPhotosByAlbum: (state)=>{
            return { ...state, photosByAlbumStatus: STATUSES.DEFAULT, photosByAlbum: [], displayAllPhotos:false}
        },
        setActiveDisplayAllPhotos: (state)=>{
            return {...state, displayAllPhotos: true}
        },
        getAllPhotos: (state)=>{
            return {...state, photosByAlbumStatus: STATUSES.LOADING}
        },
    }
})

export const { getAlbumsData, getAlbumsDataSuccess, getAlbumsDataFailure, deleteAlbumFromUser, getPhotosByAlbum, getPhotosByAlbumSuccess, getPhotosByAlbumFailure, resetPhotosByAlbum, setActiveDisplayAllPhotos, getAllPhotos} = albumSlice.actions

export const stateAlbumData = ( state: RootState ) => state.albumData
export default albumSlice.reducer