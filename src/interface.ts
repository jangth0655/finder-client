export interface Shop {
  id: number;
  createdAt: string;
  updatedAt: string;
  website: string;
  region: string;
  description: string;
  name: string;
  slug: string;
  photos: Photo[];
  comments: string;
  user: User;
  isMine: boolean;
}

export interface Photo {}

export interface User {}
