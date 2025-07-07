
// API service for MongoDB integration
export interface Author {
  id: string;
  name: string;
  email: string;
  avatar: string;
  postCount: number;
  commentCount: number;
  joinDate: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  commentCount: number;
  createdAt: string;
  tags: string[];
}

export interface Comment {
  id: string;
  content: string;
  authorName: string;
  postId: string;
  postTitle: string;
  createdAt: string;
}

export interface MonthlyStats {
  month: string;
  posts: number;
  comments: number;
  authors: number;
}

// Temporary placeholder functions that will be replaced with MongoDB calls
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  async getAuthors(): Promise<Author[]> {
    // TODO: Replace with MongoDB aggregation
    await delay(800);
    return [];
  },

  async getPosts(sortBy: 'newest' | 'mostCommented' = 'newest'): Promise<Post[]> {
    // TODO: Replace with MongoDB aggregation
    await delay(600);
    return [];
  },

  async getComments(page: number = 1, limit: number = 10): Promise<{ comments: Comment[], total: number }> {
    // TODO: Replace with MongoDB aggregation
    await delay(500);
    return {
      comments: [],
      total: 0
    };
  },

  async getTopAuthors(): Promise<Author[]> {
    // TODO: Replace with MongoDB aggregation
    await delay(400);
    return [];
  },

  async getTopCommentedPosts(): Promise<Post[]> {
    // TODO: Replace with MongoDB aggregation
    await delay(500);
    return [];
  },

  async getMonthlyStats(): Promise<MonthlyStats[]> {
    // TODO: Replace with MongoDB aggregation
    await delay(700);
    return [];
  }
};

// Export individual functions for backward compatibility
export const fetchAuthors = api.getAuthors;
export const fetchPosts = () => api.getPosts();
export const fetchComments = async () => {
  const result = await api.getComments();
  return result.comments;
};

