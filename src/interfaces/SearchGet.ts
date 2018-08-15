export interface SearchGet {
  photos: Photos;
  stat: string;
}

export interface Photos {
  page: number;
  pages: number;
  perpage: number;
  total: string;
  photo?: (PhotoEntity)[] | null;
}

export interface PhotoEntity {
  id: string;
  owner: string;
  secret: string;
  server: string;
  farm: number;
  title: string;
  ispublic: number;
  isfriend: number;
  isfamily: number;
}
