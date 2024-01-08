export type Users = {
  id: number;
  name: string;
}[];

export type Albums = {
  userId: number;
  id: number;
  title: string;
}[];

export type PhotosByAlbumRecord = {
  albumId: number;
  id: number;
  thumbnailUrl: string;
};
export type PhotosByAlbum = PhotosByAlbumRecord[] | [];
