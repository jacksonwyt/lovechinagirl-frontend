// src/pages/admin/shop/create.tsx
import { useRouter } from 'next/router';
import ShopItemForm from '@/components/admin/ShopItemForm';
import { toast } from 'react-hot-toast';
import { shopApi } from '@/api/shop';

export default function CreateShopItem() {
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    try {
      // Make sure FormData includes files
      const filesArray = Array.from(formData.getAll('images'));
      if (!filesArray.length) {
        throw new Error('Please select at least one image');
      }
  
      await shopApi.create(formData);
      toast.success('Item created successfully');
      router.push('/admin/dashboard');
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-red-500 mb-8">Add New Item</h1>
        <ShopItemForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}