import axios from "axios";
import type { Product } from "./types";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8080/api/v1";

const http = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

export async function getProducts(filters?: {
  name?: string;
  priceMin?: number;
  priceMax?: number;
  page?: number;
  pageSize?: number;
}): Promise<{ data: Product[]; total: number; page: number; pageSize: number }> {
  const params = new URLSearchParams();

  if (filters?.name) params.append("name", filters.name);
  if (filters?.priceMin !== undefined) params.append("price_min", String(filters.priceMin));
  if (filters?.priceMax !== undefined) params.append("price_max", String(filters.priceMax));
  if (filters?.page) params.append("page", String(filters.page));
  if (filters?.pageSize) params.append("page_size", String(filters.pageSize));

  const res = await http.get(`/products?${params.toString()}`);

  return {
    data: res.data.data,
    total: res.data.pagination.total,
    page: res.data.pagination.page,
    pageSize: res.data.pagination.page_size,
  };
}

export async function getProductById(id: string): Promise<Product> {
  const res = await http.get(`/products/${id}`);
  return res.data.data;
}

export async function createProduct(input: { name: string; price: number }): Promise<Product> {
  const res = await http.post("/products", input);
  return res.data.data;
}

export async function updateProduct(
  id: string,
  input: { name?: string; price?: number }
): Promise<Product> {
  const res = await http.put(`/products/${id}`, input);
  return res.data.data;
}

export async function deleteProduct(id: string): Promise<void> {
  await http.delete(`/products/${id}`);
}
