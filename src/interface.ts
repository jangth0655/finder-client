export interface Shop {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  website: string;
  region: string;
  description: string;
  name: string;
  slug: string;
  photos: Photo[];
  comments: Comment[];
  user: User;
  isMine: boolean;
  isLike: boolean;
  favCount: number;
  phone: string;
}

export interface Photo {
  url: string;
  id: number;
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
  isFollowing: boolean;
  totalFollowing: number;
  totalFollowers: number;
  seeFollowers: User[];
}

export interface Comment {
  id: number;
  createdAt: Date;
  comment: string;
  isMine: boolean;
  user: User;
}
