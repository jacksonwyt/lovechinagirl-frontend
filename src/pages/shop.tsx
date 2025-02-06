// src/pages/shop.tsx
import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShopItem } from '@/types';
import { toast } from 'react-hot-toast';

interface ShopProps {
  items: ShopItem[];
}

export default function Shop({ items }: ShopProps) {
  const handleInquiry = async (item: ShopItem) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: `Inquiry about: ${item.name}`,
          message: `I'm interested in this item: ${item.name}`,
        }),
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
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-red-500 mb-12 text-center"
        >
          Shop Our Collection
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-lg overflow-hidden shadow-lg"
            >
              <div className="relative h-64">
                <Image
                  src={item.images[0]}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {item.name}
                </h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    item.status === 'available' 
                      ? 'bg-green-100 text-green-800'
                      : item.status === 'reserved'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </span>
                  {item.status === 'available' && (
                    <button
                      onClick={() => handleInquiry(item)}
                      className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                    >
                      Inquire
                    </button>
                  )}
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
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/shop-items`);
  const items: ShopItem[] = await res.json();

  return { props: { items } };
}
