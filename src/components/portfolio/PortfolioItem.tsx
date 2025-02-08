// src/components/portfolio/PortfolioItem.tsx
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { Project } from '@/types';

interface PortfolioItemProps {
  project: Project;
}

const PortfolioItem = ({ project }: PortfolioItemProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const handleClick = () => {
    router.push(`/projects/${project.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-900 cursor-pointer"
      onClick={handleClick}
    >
      <div className={`relative w-full h-full ${isLoading ? 'animate-pulse bg-gray-800' : ''}`}>
        <Image
          src={project.images[0]}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          onLoad={() => setIsLoading(false)}
          unoptimized
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
          <p className="text-white hover:text-red-400 transition-colors">
            View Project
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default PortfolioItem;