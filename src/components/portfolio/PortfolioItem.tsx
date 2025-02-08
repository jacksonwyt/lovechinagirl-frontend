import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Project } from '@/types';

interface PortfolioItemProps {
  project: Project;
}

const PortfolioItem = ({ project }: PortfolioItemProps) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % project.images.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + project.images.length) % project.images.length);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-900"
    >
      <div className={`relative w-full h-full ${isLoading ? 'animate-pulse bg-gray-800' : ''}`}>
      <Image
  src={project.images[0]}
  alt={project.title}
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  className="object-cover"
  loading="lazy"
  quality={75}
/>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 p-4 w-full">
          <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
          <div className="flex flex-wrap gap-2 mb-3">
            {project.tags.map((tag) => (
              <span key={tag} className="px-2 py-1 text-sm bg-red-600/20 text-red-400 rounded">
                {tag}
              </span>
            ))}
          </div>
          <button
            onClick={() => setIsExpanded(true)}
            className="text-white hover:text-red-400 transition-colors"
          >
            View Project
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-6xl w-full">
            <button
              onClick={() => setIsExpanded(false)}
              className="absolute -top-12 right-0 text-white hover:text-red-400"
            >
              <X size={24} />
            </button>

            <div className="relative aspect-[16/9]">
              <Image
                src={project.images[currentImage]}
                alt={project.title}
                fill
                sizes="100vw"
                className="rounded-lg object-contain"
                quality={90}
              />
              
              {project.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full text-white hover:text-red-400"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full text-white hover:text-red-400"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </div>

            <div className="mt-4 text-white">
              <h3 className="text-2xl font-bold text-red-500 mb-2">{project.title}</h3>
              <p className="text-gray-300">{project.description}</p>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default PortfolioItem;