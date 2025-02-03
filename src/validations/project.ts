// src/validations/project.ts
import { z } from 'zod';

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB - suitable for high-res portfolio images
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

// Recommended dimensions for portfolio images:
// - Landscape: 2000x1500px (4:3 ratio)
// - Portrait: 1500x2000px (3:4 ratio)
// - Square: 2000x2000px
// This ensures good quality on high-DPI displays while maintaining reasonable file sizes

export const projectSchema = z.object({
  title: z.string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must not exceed 100 characters'),
  description: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description must not exceed 1000 characters'),
  year: z.number()
    .int()
    .min(2000)
    .max(new Date().getFullYear()),
  tags: z.string()
    .transform(str => str.split(',').map(tag => tag.trim()))
    .refine(tags => tags.every(tag => tag.length > 0), 'Each tag must not be empty')
    .refine(tags => tags.length <= 5, 'Maximum 5 tags allowed'),
  images: z.array(z.custom<File>())
    .refine(files => files.every(file => file.size <= MAX_FILE_SIZE), 
      'Each file must be less than 20MB')
    .refine(files => files.every(file => ACCEPTED_IMAGE_TYPES.includes(file.type)),
      'Only .jpg, .jpeg, .png and .webp formats are supported')
    .refine(files => files.length <= 10, 'Maximum 10 images allowed per project')
    .optional()
});

export type ProjectFormData = z.infer<typeof projectSchema>;