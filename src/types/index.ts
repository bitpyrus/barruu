export interface User {
  id: string;
  email: string;
  name: string;
  username: string;
  avatar?: string;
  bio?: string;
  website?: string;
  location?: string;
  joinedAt: Date;
  followersCount: number;
  followingCount: number;
  articlesCount: number;
}

export interface Article {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: User;
  authorId: string;
  slug: string;
  tags: string[];
  coverImage?: string;
  published: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  readTime: number;
  likesCount: number;
  commentsCount: number;
  viewsCount: number;
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  authorId: string;
  articleId: string;
  parentId?: string; // For nested comments
  createdAt: Date;
  updatedAt: Date;
  likesCount: number;
}

export interface Like {
  id: string;
  userId: string;
  articleId?: string;
  commentId?: string;
  createdAt: Date;
}

export interface Follow {
  id: string;
  followerId: string;
  followingId: string;
  createdAt: Date;
}

export interface Draft {
  id: string;
  title: string;
  content: string;
  authorId: string;
  tags: string[];
  coverImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}