import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createAuthor } from '../services/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const AddAuthorForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createAuthor,
    onSuccess: () => {
      // Invalidate and refetch the authors query
      queryClient.invalidateQueries({ queryKey: ['authors'] });
      // Reset form
      setName('');
      setEmail('');
      setAvatar('');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ name, email, avatar });
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 md:p-6 shadow-lg">
      <h3 className="text-lg md:text-xl font-semibold text-black mb-4">Add New Author</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input 
            id="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Enter author name"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Enter email address"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="avatar">Avatar URL (optional)</Label>
          <Input 
            id="avatar" 
            value={avatar} 
            onChange={(e) => setAvatar(e.target.value)} 
            placeholder="https://example.com/avatar.jpg"
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-black text-white hover:bg-gray-800"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'Adding...' : 'Add Author'}
        </Button>
        
        {mutation.isError && (
          <p className="text-red-500 text-sm">
            Error: {mutation.error instanceof Error ? mutation.error.message : 'Unknown error'}
          </p>
        )}
        
        {mutation.isSuccess && (
          <p className="text-green-500 text-sm">Author added successfully!</p>
        )}
      </form>
    </div>
  );
};

export default AddAuthorForm;