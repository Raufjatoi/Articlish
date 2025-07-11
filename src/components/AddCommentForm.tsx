import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { createComment, Author, Post } from '../services/api';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { fetchAuthors, fetchPosts } from '../services/api';

const AddCommentForm = () => {
  const [content, setContent] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [postId, setPostId] = useState('');
  const queryClient = useQueryClient();

  const { data: authors, isLoading: authorsLoading } = useQuery<Author[]>({
    queryKey: ['authors'],
    queryFn: fetchAuthors,
  });

  const { data: posts, isLoading: postsLoading } = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  const mutation = useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      // Invalidate and refetch the comments query
      queryClient.invalidateQueries({ queryKey: ['comments'] });
      // Reset form
      setContent('');
      setAuthorId('');
      setPostId('');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ content, authorId, postId });
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 md:p-6 shadow-lg">
      <h3 className="text-lg md:text-xl font-semibold text-black mb-4">Add New Comment</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="post">Post</Label>
          <Select value={postId} onValueChange={setPostId} required>
            <SelectTrigger>
              <SelectValue placeholder="Select a post" />
            </SelectTrigger>
            <SelectContent>
              {postsLoading ? (
                <SelectItem value="loading" disabled>Loading posts...</SelectItem>
              ) : (
                posts?.map(post => (
                  <SelectItem key={post.id} value={post.id}>
                    {post.title}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="author">Author</Label>
          <Select value={authorId} onValueChange={setAuthorId} required>
            <SelectTrigger>
              <SelectValue placeholder="Select an author" />
            </SelectTrigger>
            <SelectContent>
              {authorsLoading ? (
                <SelectItem value="loading" disabled>Loading authors...</SelectItem>
              ) : (
                authors?.map(author => (
                  <SelectItem key={author.id} value={author.id}>
                    {author.name}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="content">Comment</Label>
          <Textarea 
            id="content" 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            placeholder="Write your comment here..."
            rows={3}
            required
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-black text-white hover:bg-gray-800"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'Adding...' : 'Add Comment'}
        </Button>
        
        {mutation.isError && (
          <p className="text-red-500 text-sm">
            Error: {mutation.error instanceof Error ? mutation.error.message : 'Unknown error'}
          </p>
        )}
        
        {mutation.isSuccess && (
          <p className="text-green-500 text-sm">Comment added successfully!</p>
        )}
      </form>
    </div>
  );
};

export default AddCommentForm;
