import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ShopItemForm from '@/components/admin/ShopItemForm';
import { ShopItem } from '@/types';
import { toast } from 'react-hot-toast';

export default function EditShopItem() {
  const [item, setItem] = useState<ShopItem | null>(null);
  const router = useRouter();
  const { id } = router.query;

  const fetchItem = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/shop/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) throw new Error('Failed to fetch item');
      const data = await res.json();
      setItem(data);
    } catch (_error) {
      toast.error('Failed to fetch item');
      router.push('/admin/dashboard');
    }
  }, [id, router]);

  useEffect(() => {
    if (id) {
      fetchItem();
    }
  }, [id, fetchItem]);

  const handleSubmit = useCallback(
    async (formData: FormData) => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/shop/${id}`,
          {
            method: 'PUT',
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
          }
        );
        if (!res.ok) throw new Error('Failed to update item');
        toast.success('Item updated successfully');
        router.push('/admin/dashboard');
      } catch (_error) {
        toast.error('Failed to update item');
      }
    },
    [id, router]
  );

  if (!item) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-red-500 mb-8">Edit Item</h1>
        <ShopItemForm item={item} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
