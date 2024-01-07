import {configureStore} from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import albumSlice from './album/albumSlice'
import albumSagas from './album/albumSagas'


const sagaMiddleware = createSagaMiddleware()
export const store =  configureStore({
    reducer: albumSlice,
    middleware: (getDefaultMiddleware)=>getDefaultMiddleware().concat(sagaMiddleware)
})

sagaMiddleware.run(albumSagas)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch