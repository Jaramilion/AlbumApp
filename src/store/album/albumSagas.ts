import { call, put, takeEvery } from 'redux-saga/effects'
import { getAlbumsData, getAlbumsDataFailure, getAlbumsDataSuccess } from './albumSlice'
import { getUsers } from '../../api/albumApi'
import { getUsersAlbums } from '../../adapters/apiAdapter'
import { AlbumData } from '../../types/albumTypes'


function* fetchAlbums() {
  try {
    const users:Users = yield call(getUsers)
    const albumsUsers:AlbumData = yield call(getUsersAlbums, users)
    yield put(getAlbumsDataSuccess(albumsUsers))
  } catch (e) {
    yield put(getAlbumsDataFailure())
  }
}


function* albumSagas() {
  yield takeEvery(getAlbumsData, fetchAlbums)
}


export default albumSagas