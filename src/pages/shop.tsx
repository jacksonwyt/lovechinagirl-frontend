// src/pages/shop.tsx
import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShopItem } from '@/types';
import { toast } from 'react-hot-toast';
import api from '@/api/axios';

interface ShopProps {
  items: ShopItem[];
}

export default function Shop({ items }: ShopProps) {
  const handleInquiry = async (item: ShopItem) => {
    try {
      await api.post('/contact', {
        subject: `Inquiry about: ${item.name}`,
        message: `I'm interested in this item: ${item.name}`,
      });
      toast.success('Inquiry sent successfully!');
    } catch (error) {
      toast.error('Failed to send inquiry. Please try again.');
    }
};
  return (
    <>
      <Head>
        <title>Shop - Love China Girl Design</title>
        <meta name="description" content="Browse our collection of unique items" />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items?.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-900"
            >
              <div className="relative w-full h-full">
                <Image
                  src={item.images[0]}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 p-4 w-full">
                  <h3 className="text-xl font-bold text-white mb-2">{item.name}</h3>
                  <p className="text-gray-200 mb-3 line-clamp-2">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <span className={`px-2 py-1 rounded text-sm ${
                      item.status === 'available' ? 'bg-green-900 text-green-300' :
                      item.status === 'reserved' ? 'bg-yellow-900 text-yellow-300' :
                      'bg-red-900 text-red-300'
                    }`}>
                      {item.status}
                    </span>
                    {item.status === 'available' && (
                      <button
                        onClick={() => handleInquiry(item)}
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
      </div>
    </>
  );
}

// This function runs at build time or on every request (if using SSR)
export async function getServerSideProps() {
  try {
    const res = await api.get('/shop');
const items = res.data;
    return { props: { items } };
  } catch (error) {
    return { props: { items: [] } };
  }
}
