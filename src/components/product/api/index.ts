import { Product } from "../types";

const BASE_URL = "http://localhost:8080/products";

async function listProduct(): Promise<Product[]> {
  const response = await fetch(BASE_URL, {
    method: "GET",
  });

  return await response.json();
}

async function getProductById(productId: string): Promise<Product> {
  const response = await fetch(`${BASE_URL}/${productId}`, {
    method: "GET",
  });

  return await response.json();
}

async function updateProduct(productId: string, request: CreateProductRequest) {
  return await fetch(`${BASE_URL}/${productId}`, {
    method: "PUT",
    body: JSON.stringify(request),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function deleteProduct(productId: string) {
  return await fetch(`${BASE_URL}/${productId}`, {
    method: "DELETE",
  });
}

type CreateProductRequest = {
  name: string;
  price: number | null;
  description: string;
  quantity: number | null;
};
type CreateProductResponse = {
  product: Product;
};
async function createProduct(
  request: CreateProductRequest
): Promise<CreateProductResponse> {
  const response = await fetch(BASE_URL, {
    method: "POST",
    body: JSON.stringify(request),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await response.json();
}

const client = {
  listProduct,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,
};

export default client;
