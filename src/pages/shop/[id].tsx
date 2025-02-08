// src/pages/shop/[id].tsx
import { useState } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { ShopItem } from '@/types';
import api from '@/api/axios';
import { shopApi } from '@/api/shop';

interface ShopItemDetailProps {
  item: ShopItem;
}

export default function ShopItemDetail({ item }: ShopItemDetailProps) {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (router.isFallback) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % item.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? item.images.length - 1 : prev - 1
    );
  };

  const handleInquiry = async () => {
    try {
      await api.post('/api/contact', {
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
        <title>{item.name} - Love China Girl Design Shop</title>
        <meta name="description" content={item.description} />
      </Head>

      <div className="min-h-screen bg-black py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Image Gallery */}
            <div className="relative aspect-video w-full overflow-hidden rounded-lg">
              <Image
                src={item.images[currentImageIndex]}
                alt={`${item.name} - Image ${currentImageIndex + 1}`}
                fill
                className="object-contain"
                unoptimized
              />
              
              {item.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full text-white hover:bg-black/75 transition-colors"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full text-white hover:bg-black/75 transition-colors"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
              
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {item.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Item Info */}
            <div className="text-white">
              <h1 className="text-4xl font-bold text-red-500 mb-4">{item.name}</h1>
              <p className="text-lg text-gray-300 mb-6">{item.description}</p>
              
              <div className="flex items-center justify-between mb-6">
                <span className={`px-3 py-1 rounded text-sm ${
                  item.status === 'available' ? 'bg-green-900 text-green-300' :
                  item.status === 'reserved' ? 'bg-yellow-900 text-yellow-300' :
                  'bg-red-900 text-red-300'
                }`}>
                  {item.status}
                </span>
                
                {item.status === 'available' && (
                  <button
                    onClick={handleInquiry}
                    className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Inquire About This Item
                  </button>
                )}
              </div>
              
              <div className="text-gray-400">
                <p>Category: {item.category}</p>
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-6 gap-4 mt-8">
              {item.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative aspect-square rounded-lg overflow-hidden ${
                    index === currentImageIndex ? 'ring-2 ring-red-500' : ''
                  }`}
                >
                  <Image
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

// src/pages/shop/[id].tsx
export const getServerSideProps: GetServerSideProps = async ({ params, req }) => {
    try {
      const id = params?.id;
      if (!id || Array.isArray(id)) {
        return { notFound: true };
      }
  
      // Use absolute URL for SSR
      const protocol = req.headers['x-forwarded-proto'] || 'https';
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || `${protocol}://${req.headers.host}`;
      
      const response = await fetch(`${baseUrl}/api/shop/${id}`);
      if (!response.ok) {
        throw new Error(`API responded with status ${response.status}`);
      }
  
      const item = await response.json();
  
      return {
        props: {
          item
        }
      };
    } catch (error) {
      console.error('Failed to fetch shop item:', error);
      return { notFound: true };
    }
  };