import {call, put, takeEvery} from 'redux-saga/effects';
import {
  getAlbumsData,
  getAlbumsDataFailure,
  getAlbumsDataSuccess,
  getAllPhotos,
  getPhotosByAlbum,
  getPhotosByAlbumFailure,
  getPhotosByAlbumSuccess,
} from './albumSlice';
import {
  getAllPhotosAlbum,
  getPhotosByAlbumId,
  getUsers,
} from '../../api/albumApi';
import {getUsersAlbums} from '../../adapters/apiAdapter';
import {AlbumData} from '../../types/albumTypes';
import {PhotosByAlbum, Users} from '../../types/apiTypes';
import {AnyAction} from 'redux-saga';

function* fetchAlbums() {
  try {
    const users: Users = yield call(getUsers);
    const albumsUsers: AlbumData = yield call(getUsersAlbums, users);
    yield put(getAlbumsDataSuccess(albumsUsers));
  } catch (e) {
    yield put(getAlbumsDataFailure());
  }
}
function* fetchPhotosByAlbum({payload}: AnyAction) {
  try {
    const photosByAlbum: PhotosByAlbum = yield call(
      getPhotosByAlbumId,
      payload,
    );
    yield put(getPhotosByAlbumSuccess(photosByAlbum));
  } catch (e) {
    yield put(getPhotosByAlbumFailure());
  }
}

function* fetchAllPhotos() {
  try {
    const photosByAlbum: PhotosByAlbum = yield call(getAllPhotosAlbum);
    yield put(getPhotosByAlbumSuccess(photosByAlbum));
  } catch (e) {
    yield put(getPhotosByAlbumFailure());
  }
}

function* albumSagas() {
  yield takeEvery(getAlbumsData, fetchAlbums);
  yield takeEvery(getPhotosByAlbum, fetchPhotosByAlbum);
  yield takeEvery(getAllPhotos, fetchAllPhotos);
}

export default albumSagas;
