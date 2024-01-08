export type UserAlbumRecord = {
  id: number;
  name: string;
  data: AlbumRecord[];
}[];

export type AlbumRecord = {
  userId: number;
  id: number;
  title: string;
};

export type AlbumData = UserAlbumRecord | [];
