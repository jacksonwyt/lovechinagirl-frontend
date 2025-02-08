// src/pages/shop.tsx
// src/pages/shop.tsx
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShopItem } from '@/types';
import { toast } from 'react-hot-toast';
import { shopApi } from '@/api/shop';

export default function Shop() {
  const [items, setItems] = useState<ShopItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const response = await shopApi.getAll();
        console.log('API Response:', {
          status: response.status,
          data: response.data,
          headers: response.headers
        });
        
        if (!Array.isArray(response.data)) {
          console.error('Invalid response format:', response.data);
          throw new Error('Invalid data format received');
        }
        
        setItems(response.data);
      } catch (err: any) {
        console.error('Shop fetch error:', {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status
        });
        setError(err.response?.data?.message || 'Failed to load shop items');
        toast.error('Failed to load shop items. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-white text-center">
          <p className="text-xl mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Shop - Love China Girl Design</title>
        <meta name="description" content="Browse our collection of unique items" />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {items && items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-900"
              >
                <div className="relative w-full h-full">
                  {item.images?.[0] && (
                    <Image
                      src={item.images[0]}
                      alt={item.name || 'Shop item'}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        console.error('Image load error:', {
                          src: item.images[0],
                          itemId: item.id
                        });
                        e.currentTarget.style.display = 'none';
                      }}
                      unoptimized
                    />
                  )}
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 p-4 w-full">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {item.name || 'Untitled Item'}
                    </h3>
                    {item.description && (
                      <p className="text-gray-200 mb-3 line-clamp-2">{item.description}</p>
                    )}
                    <div className="flex justify-between items-center">
                      <span className={`px-2 py-1 rounded text-sm ${
                        item.status === 'available' ? 'bg-green-900 text-green-300' :
                        item.status === 'reserved' ? 'bg-yellow-900 text-yellow-300' :
                        'bg-red-900 text-red-300'
                      }`}>
                        {item.status || 'unknown'}
                      </span>
                      {item.status === 'available' && (
                        <button
                          onClick={() => {
                            toast.success('Inquiry feature coming soon!');
                          }}
                          className="text-white hover:text-red-400 transition-colors"
                        >
                          Inquire
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center text-white py-20">
            <p className="text-xl mb-4">No items available at the moment.</p>
            <p className="text-gray-400">Please check back later!</p>
          </div>
        )}
      </div>
    </>
  );
}

