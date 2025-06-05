// src/features/products/types/index.ts

export interface Product {
    id?: string; // Optional for new products, required for existing ones
    name: string;
    description: string;
    price: number; // Should be a positive number
    sku: string; // Stock Keeping Unit - usually unique
    stockQuantity: number; // Should be a non-negative integer
    category: string; // Could be an ID referencing a category entity, or a string name
    imageUrl?: string; // Optional URL for the product image
    isActive: boolean; // To mark product as active or inactive
    tags?: string[]; // Optional array of tags
    weight?: number; // Optional, e.g., in kg
    dimensions?: { // Optional
      length: number;
      width: number;
      height: number;
      unit: 'cm' | 'inch';
    };
    // Add other fields relevant to e-commerce logistics as needed:
    // supplierId?: string;
    // warehouseLocation?: string;
    // leadTime?: number; // in days
    // minOrderQuantity?: number;
    // createdAt?: Date | string;
    // updatedAt?: Date | string;
  }
  
  // You might also want a type for product creation/update payload
  // which might omit 'id', 'createdAt', 'updatedAt'
  export type ProductFormData = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>;
