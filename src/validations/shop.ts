// src/validations/shop.ts
import { z } from 'zod';

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB - matching project validation
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export const shopItemSchema = z.object({
  name: z.string()
    .min(3, 'Name must be at least 3 characters')
    .max(100, 'Name must not exceed 100 characters'),
  description: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description must not exceed 1000 characters'),
  category: z.string()
    .min(2, 'Category must be at least 2 characters')
    .max(50, 'Category must not exceed 50 characters'),
  status: z.enum(['available', 'sold', 'reserved']),
  images: z.array(z.custom<File>())
    .refine(files => files.every(file => file.size <= MAX_FILE_SIZE), 
      'Each file must be less than 20MB')
    .refine(files => files.every(file => ACCEPTED_IMAGE_TYPES.includes(file.type)),
      'Only .jpg, .jpeg, .png and .webp formats are supported')
    .refine(files => files.length <= 10, 'Maximum 10 images allowed per item')
    .optional()
});

export type ShopItemFormData = z.infer<typeof shopItemSchema>;