import {getAlbumByUser, getUsers} from '../api/albumApi';
import {AlbumData} from '../types/albumTypes';
import {Users} from '../types/apiTypes';

export const getUsersAlbums = async (users: Users): Promise<AlbumData> => {
  const usersAlbumsPromises = users.map(u => getAlbumByUser(u.id));
  const usersAlbums: AlbumData = users.map(u => {
    return {id: u.id, name: u.name, data: []};
  });
  await Promise.all(usersAlbumsPromises).then(albums =>
    albums.forEach((a, i) => {
      if (usersAlbums[i].id === a[i].userId) {
        usersAlbums[i].data = a;
      }
    }),
  );

  return usersAlbums;
};
