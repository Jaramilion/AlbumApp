import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from './redux';
import {getAlbumsData} from '../store/album/albumSlice';

export const useAlbumData = () => {
  const dispatch = useAppDispatch();
  const fetchAlbums = () => dispatch(getAlbumsData());
  useEffect(() => {
    fetchAlbums();
  }, []);

  const data = useAppSelector(state => state.albumData);
  const status = useAppSelector(state => state.albumDataStatus);

  return {data, status, fetchAlbums};
};
