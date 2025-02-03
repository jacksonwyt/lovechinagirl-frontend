// src/pages/admin/shop/create.tsx
import { useRouter } from 'next/router';
import ShopItemForm from '@/components/admin/ShopItemForm';
import { toast } from 'react-hot-toast';

export default function CreateShopItem() {
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/shop`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });
      if (!res.ok) throw new Error('Failed to create item');
      toast.success('Item created successfully');
      router.push('/admin/dashboard');
    } catch (error) {
      toast.error('Failed to create item');
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