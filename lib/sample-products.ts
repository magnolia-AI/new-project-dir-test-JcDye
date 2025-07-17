import { Product, Category } from '@/types/ecommerce'

export const categories: Category[] = [
  {
    id: '1',
    name: 'Electronics',
    slug: 'electronics',
    description: 'Latest gadgets and electronic devices',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop',
    productCount: 45,
    subcategories: [
      {
        id: '1-1',
        name: 'Smartphones',
        slug: 'smartphones',
        parentId: '1',
        productCount: 15
      },
      {
        id: '1-2',
        name: 'Laptops',
        slug: 'laptops',
        parentId: '1',
        productCount: 12
      },
      {
        id: '1-3',
        name: 'Headphones',
        slug: 'headphones',
        parentId: '1',
        productCount: 18
      }
    ]
  },
  {
    id: '2',
    name: 'Fashion',
    slug: 'fashion',
    description: 'Trendy clothing and accessories',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
    productCount: 67,
    subcategories: [
      {
        id: '2-1',
        name: 'Men\'s Clothing',
        slug: 'mens-clothing',
        parentId: '2',
        productCount: 25
      },
      {
        id: '2-2',
        name: 'Women\'s Clothing',
        slug: 'womens-clothing',
        parentId: '2',
        productCount: 30
      },
      {
        id: '2-3',
        name: 'Accessories',
        slug: 'accessories',
        parentId: '2',
        productCount: 12
      }
    ]
  },
  {
    id: '3',
    name: 'Home & Garden',
    slug: 'home-garden',
    description: 'Everything for your home and garden',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    productCount: 34,
    subcategories: [
      {
        id: '3-1',
        name: 'Furniture',
        slug: 'furniture',
        parentId: '3',
        productCount: 20
      },
      {
        id: '3-2',
        name: 'Decor',
        slug: 'decor',
        parentId: '3',
        productCount: 14
      }
    ]
  }
]

export const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro',
    description: 'The most advanced iPhone yet with titanium design, A17 Pro chip, and professional camera system.',
    price: 999,
    originalPrice: 1099,
    images: [
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600&h=600&fit=crop'
    ],
    category: 'Electronics',
    subcategory: 'Smartphones',
    brand: 'Apple',
    rating: 4.8,
    reviewCount: 1247,
    inStock: true,
    stockQuantity: 25,
    tags: ['premium', 'flagship', 'camera', '5G'],
    features: [
      'A17 Pro chip with 6-core GPU',
      'Pro camera system with 48MP main camera',
      'Titanium design',
      'Action Button',
      'USB-C connector'
    ],
    specifications: {
      'Display': '6.1-inch Super Retina XDR',
      'Storage': '128GB, 256GB, 512GB, 1TB',
      'Camera': '48MP Main, 12MP Ultra Wide, 12MP Telephoto',
      'Battery': 'Up to 23 hours video playback',
      'Connectivity': '5G, Wi-Fi 6E, Bluetooth 5.3'
    },
    variants: [
      {
        id: '1-1',
        name: 'Storage',
        value: '128GB',
        price: 999,
        inStock: true,
        stockQuantity: 10
      },
      {
        id: '1-2',
        name: 'Storage',
        value: '256GB',
        price: 1099,
        inStock: true,
        stockQuantity: 8
      },
      {
        id: '1-3',
        name: 'Storage',
        value: '512GB',
        price: 1299,
        inStock: true,
        stockQuantity: 5
      }
    ],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: '2',
    name: 'MacBook Pro 14"',
    description: 'Supercharged by M3 Pro and M3 Max chips. Built for all types of creatives, including developers, photographers, filmmakers, 3D artists, music producers, and more.',
    price: 1999,
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&h=600&fit=crop'
    ],
    category: 'Electronics',
    subcategory: 'Laptops',
    brand: 'Apple',
    rating: 4.9,
    reviewCount: 892,
    inStock: true,
    stockQuantity: 12,
    tags: ['professional', 'creative', 'performance', 'portable'],
    features: [
      'M3 Pro or M3 Max chip',
      '14.2-inch Liquid Retina XDR display',
      'Up to 22 hours battery life',
      'Advanced camera and audio',
      'Extensive connectivity'
    ],
    specifications: {
      'Display': '14.2-inch Liquid Retina XDR',
      'Chip': 'Apple M3 Pro or M3 Max',
      'Memory': '18GB or 36GB unified memory',
      'Storage': '512GB to 8TB SSD',
      'Battery': 'Up to 22 hours'
    },
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-18')
  },
  {
    id: '3',
    name: 'Sony WH-1000XM5',
    description: 'Industry-leading noise canceling headphones with exceptional sound quality and all-day comfort.',
    price: 399,
    originalPrice: 449,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=600&fit=crop'
    ],
    category: 'Electronics',
    subcategory: 'Headphones',
    brand: 'Sony',
    rating: 4.7,
    reviewCount: 2156,
    inStock: true,
    stockQuantity: 45,
    tags: ['wireless', 'noise-canceling', 'premium', 'travel'],
    features: [
      'Industry-leading noise canceling',
      '30-hour battery life',
      'Quick Charge (3 min = 3 hours)',
      'Multipoint connection',
      'Speak-to-Chat technology'
    ],
    specifications: {
      'Driver': '30mm',
      'Frequency Response': '4Hz-40,000Hz',
      'Battery Life': '30 hours (NC ON), 40 hours (NC OFF)',
      'Charging': 'USB-C',
      'Weight': '250g'
    },
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-19')
  },
  {
    id: '4',
    name: 'Premium Cotton T-Shirt',
    description: 'Soft, comfortable, and stylish cotton t-shirt perfect for everyday wear. Made from 100% organic cotton.',
    price: 29,
    originalPrice: 39,
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&h=600&fit=crop'
    ],
    category: 'Fashion',
    subcategory: 'Men\'s Clothing',
    brand: 'EcoWear',
    rating: 4.5,
    reviewCount: 324,
    inStock: true,
    stockQuantity: 150,
    tags: ['organic', 'comfortable', 'casual', 'sustainable'],
    features: [
      '100% organic cotton',
      'Pre-shrunk fabric',
      'Reinforced seams',
      'Tagless design',
      'Machine washable'
    ],
    specifications: {
      'Material': '100% Organic Cotton',
      'Fit': 'Regular',
      'Care': 'Machine wash cold',
      'Origin': 'Made in USA'
    },
    variants: [
      {
        id: '4-1',
        name: 'Size',
        value: 'S',
        inStock: true,
        stockQuantity: 25
      },
      {
        id: '4-2',
        name: 'Size',
        value: 'M',
        inStock: true,
        stockQuantity: 40
      },
      {
        id: '4-3',
        name: 'Size',
        value: 'L',
        inStock: true,
        stockQuantity: 35
      },
      {
        id: '4-4',
        name: 'Size',
        value: 'XL',
        inStock: true,
        stockQuantity: 30
      }
    ],
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-16')
  },
  {
    id: '5',
    name: 'Wireless Charging Pad',
    description: 'Fast wireless charging pad compatible with all Qi-enabled devices. Sleek design with LED indicator.',
    price: 49,
    images: [
      'https://images.unsplash.com/photo-1609592806596-4d1b6c3b8b8e?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop'
    ],
    category: 'Electronics',
    subcategory: 'Accessories',
    brand: 'TechFlow',
    rating: 4.3,
    reviewCount: 567,
    inStock: true,
    stockQuantity: 78,
    tags: ['wireless', 'charging', 'convenient', 'fast'],
    features: [
      '15W fast charging',
      'Qi-certified',
      'LED charging indicator',
      'Non-slip surface',
      'Overcharge protection'
    ],
    specifications: {
      'Input': '9V/2A, 5V/3A',
      'Output': '15W/10W/7.5W/5W',
      'Compatibility': 'Qi-enabled devices',
      'Dimensions': '100 x 100 x 8mm'
    },
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-21')
  },
  {
    id: '6',
    name: 'Modern Floor Lamp',
    description: 'Elegant modern floor lamp with adjustable brightness and warm LED lighting. Perfect for any room.',
    price: 129,
    originalPrice: 159,
    images: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=600&fit=crop'
    ],
    category: 'Home & Garden',
    subcategory: 'Decor',
    brand: 'LightCraft',
    rating: 4.6,
    reviewCount: 189,
    inStock: true,
    stockQuantity: 23,
    tags: ['modern', 'adjustable', 'LED', 'elegant'],
    features: [
      'Dimmable LED lighting',
      'Touch control',
      'Memory function',
      'Stable weighted base',
      'Energy efficient'
    ],
    specifications: {
      'Height': '150cm',
      'Light Source': 'LED',
      'Power': '12W',
      'Color Temperature': '3000K',
      'Material': 'Metal and fabric'
    },
    createdAt: new Date('2024-01-11'),
    updatedAt: new Date('2024-01-17')
  }
]

export const featuredProducts = sampleProducts.slice(0, 4)
export const newArrivals = sampleProducts.slice(2, 6)
export const bestSellers = sampleProducts.filter(p => p.reviewCount > 500)
