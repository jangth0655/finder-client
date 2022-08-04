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
  isLike: boolean;
}

export interface Photo {
  url: string;
}

export interface User {
  id: number;
  createdAt: Date;
  updatedA: Date;
  email: string;
  username: string;
  password: string;
  avatar: string;
  bio: string;
  careers: string;
  region: string;
  phone: string;
  name: string;
  isMe: boolean;
}
