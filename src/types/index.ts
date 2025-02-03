// src/types/index.ts

export interface Project {
    id: string;
    title: string;
    description: string;
    images: string[];
    tags: string[];
    year: number;
  }
  export interface Project {
    id: string;
    title: string;
    description: string;
    images: string[];
    tags: string[];
    year: number;
  }
  
  export interface ShopItem {
    id: string;
    name: string;
    description: string;
    images: string[];
    category: string;
    status: 'available' | 'sold' | 'reserved';
  }