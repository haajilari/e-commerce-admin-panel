// src/features/products/services/productService.ts
import { type Product, type ProductFormData } from '@/features/products/types'

const SIMULATION_DELAY = 700 // ms

// In-memory "database" for products
let mockProductsDB: Product[] = [
  {
    id: 'prod_1_elec',
    name: 'Advanced Gaming Laptop',
    description:
      'A laptop with a next-gen processor, powerful GPU, and 144Hz display for the best gaming experience.',
    price: 65000000,
    sku: 'LP-GM-XYZ-001',
    stockQuantity: 15,
    category: 'electronics',
    imageUrl: 'https://via.placeholder.com/400x300.png/007bff/ffffff?Text=Laptop+Gaming',
    isActive: true,
    weight: 2.5,
    dimensions: { length: 38, width: 26, height: 2.5, unit: 'cm' },
    tags: ['gaming', 'laptop', 'high-performance'],
  },
  {
    id: 'prod_2_book',
    name: 'Complete React Guidebook',
    description:
      'A complete guide to learning React from beginner to advanced, covering hooks, Redux, and Next.js.',
    price: 350000,
    sku: 'BK-REACT-ADV-002',
    stockQuantity: 50,
    category: 'books',
    imageUrl: 'https://via.placeholder.com/400x300.png/4caf50/ffffff?Text=React+Book',
    isActive: true,
    weight: 0.8,
    tags: ['react', 'javascript', 'programming', 'frontend'],
  },
  {
    id: 'prod_3_cloth',
    name: 'Basic Cotton T-Shirt',
    description: 'High-quality 100% cotton t-shirt, perfect for everyday use in all seasons.',
    price: 220000,
    sku: 'TS-COTTON-BLK-M',
    stockQuantity: 120,
    category: 'clothing',
    isActive: true,
    weight: 0.2,
    tags: ['tshirt', 'cotton', 'basic'],
  },
  {
    id: 'prod_4_elec_phone',
    name: 'Flagship Smartphone',
    description: 'Latest smartphone model with an incredible camera and long-lasting battery.',
    price: 35000000,
    sku: 'PH-FLAG-2025',
    stockQuantity: 30,
    category: 'electronics',
    isActive: true,
    tags: ['smartphone', 'mobile', 'flagship'],
  },
  {
    id: 'prod_5_home_decor',
    name: 'Ceramic Decorative Vase',
    description: 'Beautiful ceramic vase to decorate your home.',
    price: 450000,
    sku: 'HM-POT-CER-001',
    stockQuantity: 40,
    category: 'home-garden',
    isActive: true,
    tags: ['decor', 'home', 'pottery'],
  },

  // 10 More Mock Products
  {
    id: 'prod_6_accessory',
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with long battery life and smooth performance.',
    price: 600000,
    sku: 'AC-MOUSE-WL-001',
    stockQuantity: 75,
    category: 'electronics',
    isActive: true,
    tags: ['mouse', 'wireless', 'accessory'],
  },
  {
    id: 'prod_7_book',
    name: 'Mastering TypeScript',
    description: 'Comprehensive guide to mastering TypeScript for scalable applications.',
    price: 420000,
    sku: 'BK-TS-MASTER-003',
    stockQuantity: 60,
    category: 'books',
    isActive: true,
    tags: ['typescript', 'javascript', 'backend'],
  },
  {
    id: 'prod_8_kitchen',
    name: 'Stainless Steel Cookware Set',
    description: 'Premium 5-piece cookware set for your kitchen needs.',
    price: 1200000,
    sku: 'KT-SS-SET-005',
    stockQuantity: 25,
    category: 'home-kitchen',
    isActive: true,
    tags: ['cookware', 'kitchen', 'steel'],
  },
  {
    id: 'prod_9_fitness',
    name: 'Adjustable Dumbbell Set',
    description: 'High-quality dumbbell set adjustable from 5kg to 25kg.',
    price: 2500000,
    sku: 'FT-DMB-ADJ-010',
    stockQuantity: 20,
    category: 'sports',
    isActive: true,
    tags: ['fitness', 'gym', 'dumbbells'],
  },
  {
    id: 'prod_10_cloth',
    name: "Men's Winter Jacket",
    description: 'Waterproof and insulated winter jacket with hood.',
    price: 850000,
    sku: 'CL-M-JACKET-WTR',
    stockQuantity: 35,
    category: 'clothing',
    isActive: true,
    tags: ['jacket', 'winter', 'men'],
  },
  {
    id: 'prod_11_elec',
    name: 'Bluetooth Headphones',
    description: 'Noise-cancelling wireless headphones with deep bass and clear sound.',
    price: 1800000,
    sku: 'HP-BT-NC-012',
    stockQuantity: 45,
    category: 'electronics',
    isActive: true,
    tags: ['headphones', 'bluetooth', 'audio'],
  },
  {
    id: 'prod_12_cloth',
    name: "Women's Yoga Pants",
    description: 'Comfortable and stretchy yoga pants for active wear.',
    price: 320000,
    sku: 'CL-W-YOGA-BLK',
    stockQuantity: 90,
    category: 'clothing',
    isActive: true,
    tags: ['yoga', 'pants', 'women'],
  },
  {
    id: 'prod_13_toy',
    name: 'Educational Wooden Blocks',
    description: "Colorful wooden block set to enhance kids' creativity and motor skills.",
    price: 150000,
    sku: 'TY-WOOD-EDU-004',
    stockQuantity: 55,
    category: 'toys',
    isActive: true,
    tags: ['toy', 'kids', 'wooden'],
  },
  {
    id: 'prod_14_book',
    name: 'Psychology of Influence',
    description: 'A deep dive into how persuasion works in human behavior and decision making.',
    price: 270000,
    sku: 'BK-PSY-INFL-014',
    stockQuantity: 70,
    category: 'books',
    isActive: true,
    tags: ['psychology', 'influence', 'behavior'],
  },
  {
    id: 'prod_15_home',
    name: 'LED Desk Lamp',
    description: 'Adjustable brightness LED desk lamp with USB charging port.',
    price: 480000,
    sku: 'HM-DESK-LED-009',
    stockQuantity: 60,
    category: 'home-garden',
    isActive: true,
    tags: ['lamp', 'desk', 'LED'],
  },
]

// Helper to generate a simple unique ID
const generateId = (): string => `prod_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`

/**
 * Simulates creating a new product.
 */
export const createProduct = (productData: ProductFormData): Promise<Product> => {
  return new Promise((resolve) => {
    console.log('productService: Simulating createProduct...', productData)
    setTimeout(() => {
      const newProduct: Product = {
        ...productData,
        id: generateId(), // Assign a new ID
        // createdAt: new Date().toISOString(),
        // updatedAt: new Date().toISOString(),
      }
      mockProductsDB.push(newProduct)
      console.log('productService: Product created:', newProduct)
      resolve(newProduct)
    }, SIMULATION_DELAY)
  })
}

/**
 * Simulates fetching a single product by its ID.
 */
export const getProductById = (productId: string): Promise<Product | undefined> => {
  return new Promise((resolve) => {
    console.log(`productService: Simulating getProductById for ID: ${productId}`)
    setTimeout(() => {
      const product = mockProductsDB.find((p) => p.id === productId)
      if (product) {
        console.log('productService: Product found:', product)
        resolve(product)
      } else {
        console.warn(`productService: Product with ID ${productId} not found.`)
        resolve(undefined) // Or reject(new Error('Product not found'))
      }
    }, SIMULATION_DELAY / 2)
  })
}

/**
 * Simulates updating an existing product.
 */
export const updateProduct = (
  productId: string,
  productData: ProductFormData
): Promise<Product> => {
  return new Promise((resolve, reject) => {
    console.log(`productService: Simulating updateProduct for ID: ${productId}`, productData)
    setTimeout(() => {
      const productIndex = mockProductsDB.findIndex((p) => p.id === productId)
      if (productIndex !== -1) {
        mockProductsDB[productIndex] = {
          ...mockProductsDB[productIndex], // Keep existing fields like id, createdAt
          ...productData, // Override with new data
          // updatedAt: new Date().toISOString(),
        }
        console.log('productService: Product updated:', mockProductsDB[productIndex])
        resolve(mockProductsDB[productIndex])
      } else {
        console.error(`productService: Product with ID ${productId} not found for update.`)
        reject(new Error(`Product with ID ${productId} not found.`))
      }
    }, SIMULATION_DELAY)
  })
}

// --- Functions for Module 8 (Product Listing, Pagination, Deletion) ---
interface GetProductsParams {
  page?: number
  limit?: number
  category?: string
  searchTerm?: string
  sortBy?: keyof Product
  sortOrder?: 'asc' | 'desc'
}
interface PaginatedProductsResponse {
  products: Product[]
  totalCount: number
  totalPages: number
  currentPage: number
}

/**
 * Simulates fetching a list of products with pagination and basic filtering.
 * This will be fully implemented in Module 8.
 */
export const getProducts = (params: GetProductsParams = {}): Promise<PaginatedProductsResponse> => {
  const { page = 1, limit = 10 /* category, searchTerm, sortBy, sortOrder */ } = params
  console.log(
    `productService: Simulating getProducts (Page: ${page}, Limit: ${limit}). Full implementation in Module 8.`
  )

  return new Promise((resolve) => {
    setTimeout(() => {
      // Basic pagination for now
      const totalCount = mockProductsDB.length
      const totalPages = Math.ceil(totalCount / limit)
      const startIndex = (page - 1) * limit
      const endIndex = page * limit
      const paginatedProducts = mockProductsDB.slice(startIndex, endIndex)

      console.log(`productService: Returning ${paginatedProducts.length} products.`)
      resolve({
        products: paginatedProducts,
        totalCount,
        totalPages,
        currentPage: page,
      })
    }, SIMULATION_DELAY)
  })
}

/**
 * Simulates deleting a product.
 * This will be fully implemented in Module 8.
 */
export const deleteProduct = (productId: string): Promise<void> => {
  console.log(
    `productService: Simulating deleteProduct for ID: ${productId}. Full implementation in Module 8.`
  )
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const initialLength = mockProductsDB.length
      mockProductsDB = mockProductsDB.filter((p) => p.id !== productId)
      if (mockProductsDB.length < initialLength) {
        console.log(`productService: Product ${productId} deleted.`)
        resolve()
      } else {
        console.error(`productService: Product ${productId} not found for deletion.`)
        reject(new Error(`Product ${productId} not found.`))
      }
    }, SIMULATION_DELAY / 2)
  })
}
