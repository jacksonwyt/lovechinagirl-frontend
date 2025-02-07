import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ShopItemForm from '@/components/admin/ShopItemForm';
import { ShopItem } from '@/types';
import { toast } from 'react-hot-toast';
import { shopApi } from '@/api/shop';

export default function EditShopItem() {
  const [item, setItem] = useState<ShopItem | null>(null);
  const router = useRouter();
  const { id } = router.query;

  /**
   * Fetch the existing shop item using shopApi (Axios)
   */
  const fetchItem = useCallback(async () => {
    try {
      // shopApi.getOne() returns an AxiosResponse<ShopItem>
      const { data } = await shopApi.getOne(id as string);
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

  /**
   * Submit updated form data using shopApi (Axios)
   */
  const handleSubmit = useCallback(
    async (formData: FormData) => {
      try {
        await shopApi.update(id as string, formData);
        toast.success('Item updated successfully');
        router.push('/admin/dashboard');
      } catch (_error) {
        toast.error('Failed to update item');
      }
    },
    [id, router]
  );

  if (!item) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-red-500 mb-8">Edit Item</h1>
        <ShopItemForm item={item} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}

