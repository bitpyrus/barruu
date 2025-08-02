import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  getDocs, 
  getDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  serverTimestamp,
  Timestamp 
} from 'firebase/firestore';
import { db } from './firebase';
import { Article } from '@/types';

export interface CreatePostData {
  title: string;
  content: string;
  tags: string[];
  excerpt?: string;
  coverImage?: string;
}

export interface PostData extends CreatePostData {
  id: string;
  authorId: string;
  slug: string;
  published: boolean;
  publishedAt?: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  readTime: number;
  likesCount: number;
  commentsCount: number;
  viewsCount: number;
}

// Generate slug from title
const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

// Calculate reading time (average 200 words per minute)
const calculateReadTime = (content: string): number => {
  const wordsPerMinute = 200;
  const textContent = content.replace(/<[^>]*>/g, ''); // Remove HTML tags
  const wordCount = textContent.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};

// Generate excerpt from content
const generateExcerpt = (content: string, maxLength: number = 150): string => {
  const textContent = content.replace(/<[^>]*>/g, ''); // Remove HTML tags
  return textContent.length > maxLength 
    ? textContent.substring(0, maxLength) + '...'
    : textContent;
};

// Helper function to get detailed error message
const getFirebaseErrorMessage = (error: any): string => {
  if (error?.code) {
    switch (error.code) {
      case 'permission-denied':
        return 'Permission denied. Please check your authentication and try again.';
      case 'unavailable':
        return 'Service temporarily unavailable. Please check your internet connection and try again.';
      case 'deadline-exceeded':
        return 'Request timed out. Please try again.';
      case 'resource-exhausted':
        return 'Too many requests. Please wait a moment and try again.';
      case 'invalid-argument':
        return 'Invalid data provided. Please check your post content and try again.';
      case 'not-found':
        return 'Resource not found. The post may have been deleted.';
      case 'already-exists':
        return 'A post with this information already exists.';
      case 'failed-precondition':
        return 'Database operation failed. Please try again.';
      case 'aborted':
        return 'Operation was aborted. Please try again.';
      case 'out-of-range':
        return 'Data is out of acceptable range. Please check your input.';
      case 'unimplemented':
        return 'This feature is not yet implemented.';
      case 'internal':
        return 'Internal server error. Please try again later.';
      case 'unauthenticated':
        return 'Please sign in and try again.';
      default:
        return `Firebase error (${error.code}): ${error.message || 'Unknown error occurred'}`;
    }
  }
  return error?.message || 'An unexpected error occurred. Please try again.';
};

// Save post as draft
export const savePostDraft = async (
  postData: CreatePostData, 
  authorId: string,
  postId?: string
): Promise<string> => {
  try {
    // Validate input data
    if (!postData.title?.trim()) {
      throw new Error('Title is required');
    }
    if (!postData.content?.trim()) {
      throw new Error('Content is required');
    }
    if (!postData.tags || postData.tags.length === 0) {
      throw new Error('At least one tag is required');
    }
    if (!authorId) {
      throw new Error('User authentication required');
    }

    const slug = generateSlug(postData.title);
    const readTime = calculateReadTime(postData.content);
    const excerpt = postData.excerpt || generateExcerpt(postData.content);

    const data = {
      ...postData,
      excerpt,
      authorId,
      slug,
      published: false,
      readTime,
      likesCount: 0,
      commentsCount: 0,
      viewsCount: 0,
      updatedAt: serverTimestamp(),
      ...(postId ? {} : { createdAt: serverTimestamp() })
    };

    console.log('Saving draft with data:', { ...data, content: '[CONTENT_HIDDEN]' });

    if (postId) {
      // Update existing draft
      const postRef = doc(db, 'posts', postId);
      await updateDoc(postRef, data);
      console.log('Draft updated successfully:', postId);
      return postId;
    } else {
      // Create new draft
      const docRef = await addDoc(collection(db, 'posts'), data);
      console.log('Draft created successfully:', docRef.id);
      return docRef.id;
    }
  } catch (error: any) {
    console.error('Error saving post draft:', error);
    const errorMessage = getFirebaseErrorMessage(error);
    throw new Error(errorMessage);
  }
};

// Publish post
export const publishPost = async (
  postData: CreatePostData,
  authorId: string,
  postId?: string
): Promise<string> => {
  try {
    // Validate input data
    if (!postData.title?.trim()) {
      throw new Error('Title is required');
    }
    if (!postData.content?.trim()) {
      throw new Error('Content is required');
    }
    if (!postData.tags || postData.tags.length === 0) {
      throw new Error('At least one tag is required');
    }
    if (!authorId) {
      throw new Error('User authentication required');
    }

    const slug = generateSlug(postData.title);
    const readTime = calculateReadTime(postData.content);
    const excerpt = postData.excerpt || generateExcerpt(postData.content);

    const data = {
      ...postData,
      excerpt,
      authorId,
      slug,
      published: true,
      publishedAt: serverTimestamp(),
      readTime,
      likesCount: 0,
      commentsCount: 0,
      viewsCount: 0,
      updatedAt: serverTimestamp(),
      ...(postId ? {} : { createdAt: serverTimestamp() })
    };

    console.log('Publishing post with data:', { ...data, content: '[CONTENT_HIDDEN]' });

    if (postId) {
      // Update existing post and publish
      const postRef = doc(db, 'posts', postId);
      await updateDoc(postRef, data);
      console.log('Post updated and published successfully:', postId);
      return postId;
    } else {
      // Create new post and publish
      const docRef = await addDoc(collection(db, 'posts'), data);
      console.log('Post created and published successfully:', docRef.id);
      return docRef.id;
    }
  } catch (error: any) {
    console.error('Error publishing post:', error);
    const errorMessage = getFirebaseErrorMessage(error);
    throw new Error(`Failed to publish post: ${errorMessage}`);
  }
};

// Get user's posts (drafts and published)
export const getUserPosts = async (authorId: string): Promise<PostData[]> => {
  try {
    const q = query(
      collection(db, 'posts'),
      where('authorId', '==', authorId),
      orderBy('updatedAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as PostData));
  } catch (error: any) {
    console.error('Error fetching user posts:', error);
    const errorMessage = getFirebaseErrorMessage(error);
    throw new Error(errorMessage);
  }
};

// Get published posts
export const getPublishedPosts = async (limitCount: number = 10): Promise<PostData[]> => {
  try {
    const q = query(
      collection(db, 'posts'),
      where('published', '==', true),
      orderBy('publishedAt', 'desc'),
      limit(limitCount)
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as PostData));
  } catch (error: any) {
    console.error('Error fetching published posts:', error);
    const errorMessage = getFirebaseErrorMessage(error);
    throw new Error(errorMessage);
  }
};

// Get single post by ID
export const getPostById = async (postId: string): Promise<PostData | null> => {
  try {
    const docRef = doc(db, 'posts', postId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      } as PostData;
    }
    return null;
  } catch (error: any) {
    console.error('Error fetching post:', error);
    const errorMessage = getFirebaseErrorMessage(error);
    throw new Error(errorMessage);
  }
};
