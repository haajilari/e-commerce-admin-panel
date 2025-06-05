// src/features/products/services/productService.ts
import { type Product, type ProductFormData } from '@/features/products/types'

const SIMULATION_DELAY = 700 // ms

// In-memory "database" for products
let mockProductsDB: Product[] = [
  {
    id: 'prod_1_elec',
    name: 'لپ تاپ گیمینگ پیشرفته',
    description:
      'لپ تاپ با پردازنده نسل جدید، کارت گرافیک قدرتمند، و صفحه نمایش ۱۴۴ هرتز برای بهترین تجربه بازی.',
    price: 65000000,
    sku: 'LP-GM-XYZ-001',
    stockQuantity: 15,
    category: 'electronics',
    imageUrl: 'https://via.placeholder.com/400x300.png/007bff/ffffff?Text=Laptop+Gaming',
    isActive: true,
    weight: 2.5,
    dimensions: { length: 38, width: 26, height: 2.5, unit: 'cm' },
    tags: ['gaming', 'laptop', 'high-performance'],
    // createdAt: new Date().toISOString(),
    // updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod_2_book',
    name: 'کتاب آموزش جامع React',
    description:
      'مرجع کامل برای یادگیری React از مقدماتی تا پیشرفته، شامل هوک‌ها، Redux، و Next.js.',
    price: 350000,
    sku: 'BK-REACT-ADV-002',
    stockQuantity: 50,
    category: 'books',
    imageUrl: 'https://via.placeholder.com/400x300.png/4caf50/ffffff?Text=React+Book',
    isActive: true,
    weight: 0.8,
    // dimensions: undefined,
    tags: ['react', 'javascript', 'programming', 'frontend'],
    // createdAt: new Date().toISOString(),
    // updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod_3_cloth',
    name: 'تیشرت نخی ساده',
    description: 'تیشرت ۱۰۰٪ نخی با کیفیت بالا، مناسب برای استفاده روزمره در تمام فصول.',
    price: 220000,
    sku: 'TS-COTTON-BLK-M',
    stockQuantity: 120,
    category: 'clothing',
    isActive: true,
    // imageUrl: '',
    weight: 0.2,
    tags: ['tshirt', 'cotton', 'basic'],
    // createdAt: new Date().toISOString(),
    // updatedAt: new Date().toISOString(),
  },
  // Add 17 more mock products to reach at least 20 for pagination testing later
  // For brevity, I'll add a few more simple ones.
  // You should expand this list to at least 20 items for Module 8.
  {
    id: 'prod_4_elec_phone',
    name: 'گوشی هوشمند پرچمدار',
    description: 'آخرین مدل گوشی هوشمند با دوربین فوق العاده و باتری با دوام.',
    price: 35000000,
    sku: 'PH-FLAG-2025',
    stockQuantity: 30,
    category: 'electronics',
    isActive: true,
    tags: ['smartphone', 'mobile', 'flagship'],
  },
  {
    id: 'prod_5_home_decor',
    name: 'گلدان سرامیکی دکوری',
    description: 'گلدان زیبا برای تزئین منزل شما.',
    price: 450000,
    sku: 'HM-POT-CER-001',
    stockQuantity: 40,
    category: 'home-garden',
    isActive: true,
    tags: ['decor', 'home', 'pottery'],
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
