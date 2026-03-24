import type { Product, ProductsResponse } from '@/types/product'

const API_BASE_URL = 'https://dummyjson.com'

async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`)

  if (!response.ok) {
    const errorText = await response.text()
    const message = errorText || `Request failed with status ${response.status}`

    throw new Error(message)
  }

  return (await response.json()) as T
}

export async function fetchProducts(): Promise<ProductsResponse> {
  return request<ProductsResponse>('/products')
}

export async function fetchProductById(id: number): Promise<Product> {
  return request<Product>(`/products/${id}`)
}

export async function fetchCategories(): Promise<string[]> {
  return request<string[]>('/products/category-list')
}
