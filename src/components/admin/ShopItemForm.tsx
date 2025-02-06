// src/components/admin/ShopItemForm.tsx
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { ShopItem } from '@/types';
import { shopItemSchema } from '@/validations/shop';
import { ZodError } from 'zod';

interface ShopItemFormProps {
  item?: ShopItem;
  onSubmit: (formData: FormData) => void;
}

export default function ShopItemForm({ item, onSubmit }: ShopItemFormProps) {
  const [images, setImages] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const validationData = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      category: formData.get('category') as string,
      status: formData.get('status') as 'available' | 'sold' | 'reserved',
      images: images
    };

    try {
      // Validate the data
      shopItemSchema.parse(validationData);
      
      // If validation passes, submit the form
      images.forEach(image => {
        formData.append('images', image);
      });

      onSubmit(formData);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            validationErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(validationErrors);
        toast.error('Please fix the validation errors');
      } else {
        toast.error('An unexpected error occurred');
      }
    }
  };

  const getErrorClass = (field: keyof typeof errors) => 
    errors[field] ? 'border-red-500' : 'border-red-800';

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-gray-300 mb-2">Name</label>
        <input
          name="name"
          defaultValue={item?.name}
          className={`w-full p-2 bg-gray-900 border rounded ${getErrorClass('name')}`}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
        )}
      </div>

      <div>
        <label className="block text-gray-300 mb-2">Description</label>
        <textarea
          name="description"
          defaultValue={item?.description}
          className={`w-full p-2 bg-gray-900 border rounded h-32 ${getErrorClass('description')}`}
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description}</p>
        )}
      </div>

      <div>
        <label className="block text-gray-300 mb-2">Images</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => setImages(Array.from(e.target.files || []))}
          className={`w-full p-2 bg-gray-900 border rounded ${getErrorClass('images')}`}
        />
        {errors.images && (
          <p className="text-red-500 text-sm mt-1">{errors.images}</p>
        )}
      </div>

      <div>
        <label className="block text-gray-300 mb-2">Category</label>
        <input
          name="category"
          defaultValue={item?.category}
          className={`w-full p-2 bg-gray-900 border rounded ${getErrorClass('category')}`}
        />
        {errors.category && (
          <p className="text-red-500 text-sm mt-1">{errors.category}</p>
        )}
      </div>

      <div>
        <label className="block text-gray-300 mb-2">Status</label>
        <select
          name="status"
          defaultValue={item?.status || 'available'}
          className={`w-full p-2 bg-gray-900 border rounded ${getErrorClass('status')}`}
        >
          <option value="available">Available</option>
          <option value="reserved">Reserved</option>
          <option value="sold">Sold</option>
        </select>
        {errors.status && (
          <p className="text-red-500 text-sm mt-1">{errors.status}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-red-600 text-white p-3 rounded hover:bg-red-700"
      >
        {item ? 'Update Item' : 'Create Item'}
      </button>
    </form>
  );
}