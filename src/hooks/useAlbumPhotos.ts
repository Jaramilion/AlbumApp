import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from './redux';
import {
  getAllPhotos,
  getPhotosByAlbum,
  resetPhotosByAlbum,
} from '../store/album/albumSlice';
import FastImage from 'react-native-fast-image';

export const useAlbumPhotos = (albumId: number) => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(state => state.photosByAlbum);
  const status = useAppSelector(state => state.photosByAlbumStatus);
  const toggleStatus = useAppSelector(state => state.displayAllPhotos);
  useEffect(() => {
    if (toggleStatus) {
      dispatch(getAllPhotos());
    } else {
      setTimeout(() => {
        fetchPhotos();
      }, 50);
    }
  }, [toggleStatus]);

  useEffect(() => {
    return () => {
      cleanImgsCache();
    };
  }, []);

  function fetchPhotos() {
    dispatch(getPhotosByAlbum(albumId));
  }

  async function cleanImgsCache() {
    await FastImage.clearDiskCache();
    await FastImage.clearMemoryCache();
    dispatch(resetPhotosByAlbum());
  }

  return {data, status, fetchPhotos};
};
