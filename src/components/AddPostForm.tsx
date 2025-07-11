import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { createPost, Author } from '../services/api';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { fetchAuthors } from '../services/api';

const AddPostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [tags, setTags] = useState('');
  const queryClient = useQueryClient();

  const { data: authors, isLoading: authorsLoading } = useQuery<Author[]>({
    queryKey: ['authors'],
    queryFn: fetchAuthors,
  });

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      // Invalidate and refetch the posts query
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      // Reset form
      setTitle('');
      setContent('');
      setAuthorId('');
      setTags('');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const tagArray = tags.split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);
    
    mutation.mutate({ 
      title, 
      content, 
      authorId,
      tags: tagArray
    });
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 md:p-6 shadow-lg">
      <h3 className="text-lg md:text-xl font-semibold text-black mb-4">Add New Post</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input 
            id="title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="Enter post title"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="content">Content</Label>
          <Textarea 
            id="content" 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            placeholder="Write your post content here..."
            rows={5}
            required
          />
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
          <Label htmlFor="tags">Tags (comma separated)</Label>
          <Input 
            id="tags" 
            value={tags} 
            onChange={(e) => setTags(e.target.value)} 
            placeholder="React, MongoDB, TypeScript"
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-black text-white hover:bg-gray-800"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'Adding...' : 'Add Post'}
        </Button>
        
        {mutation.isError && (
          <p className="text-red-500 text-sm">
            Error: {mutation.error instanceof Error ? mutation.error.message : 'Unknown error'}
          </p>
        )}
        
        {mutation.isSuccess && (
          <p className="text-green-500 text-sm">Post added successfully!</p>
        )}
      </form>
    </div>
  );
};

export default AddPostForm;