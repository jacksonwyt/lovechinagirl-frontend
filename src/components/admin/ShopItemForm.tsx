// src/components/admin/ShopItemForm.tsx
import { useState } from 'react';
import { ShopItem } from '@/types';

interface ShopItemFormProps {
  item?: ShopItem;
  onSubmit: (formData: FormData) => void;
}

export default function ShopItemForm({ item, onSubmit }: ShopItemFormProps) {
  const [images, setImages] = useState<File[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    images.forEach(image => {
      formData.append('images', image);
    });

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-gray-300 mb-2">Name</label>
        <input
          name="name"
          defaultValue={item?.name}
          className="w-full p-2 bg-gray-900 border border-red-800 rounded"
          required
        />
      </div>

      <div>
        <label className="block text-gray-300 mb-2">Description</label>
        <textarea
          name="description"
          defaultValue={item?.description}
          className="w-full p-2 bg-gray-900 border border-red-800 rounded h-32"
          required
        />
      </div>

      <div>
        <label className="block text-gray-300 mb-2">Images</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => setImages(Array.from(e.target.files || []))}
          className="w-full p-2 bg-gray-900 border border-red-800 rounded"
        />
      </div>

      <div>
        <label className="block text-gray-300 mb-2">Category</label>
        <input
          name="category"
          defaultValue={item?.category}
          className="w-full p-2 bg-gray-900 border border-red-800 rounded"
          required
        />
      </div>

      <div>
        <label className="block text-gray-300 mb-2">Status</label>
        <select
          name="status"
          defaultValue={item?.status || 'available'}
          className="w-full p-2 bg-gray-900 border border-red-800 rounded"
        >
          <option value="available">Available</option>
          <option value="reserved">Reserved</option>
          <option value="sold">Sold</option>
        </select>
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