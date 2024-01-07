import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { RootState } from '..'
import { AlbumData } from '../../types/albumTypes'
import STATUSES from '../../types/statuses'

interface albumState {
    albumData: AlbumData,
    albumDataStatus: STATUSES
}

const initialState: albumState = {
    albumData : [],
    albumDataStatus : STATUSES.DEFAULT
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
        }

    }
})

export const {getAlbumsData, getAlbumsDataSuccess, getAlbumsDataFailure, deleteAlbumFromUser} = albumSlice.actions

export const stateAlbumData = ( state: RootState ) => state.albumData
export default albumSlice.reducer