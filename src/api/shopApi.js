
import api from "./api";


// PRODUCTS
export const getProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};

export const getProduct = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const createProduct = async (data) => {
  const response = await api.post("/products", data);
  return response.data;
};

export const updateProduct = async (id, data) => {
  const response = await api.put(`/products/${id}`, data);
  return response.data;
};


// CATEGORIES
export const getCategories = async () => {
  const response = await api.get("/categories");
  return response.data;
};


// CART
export const getCart = async () => {
  const response = await api.get("/cart");
  return response.data;
};

export const addToCart = async (data) => {
  const response = await api.post("/cart", data);
  return response.data;
};

export const updateCartItem = async (itemId, data) => {
  const response = await api.put(
    `/cart/${itemId}`,
    data
  );

  return response.data;
};

export const removeCartItem = async (itemId) => {
  const response = await api.delete(
    `/cart/${itemId}`
  );

  return response.data;
};


// ORDERS
export const getOrders = async () => {
  const response = await api.get("/orders");
  return response.data;
};

export const getOrder = async (id) => {
  const response = await api.get(`/orders/${id}`);
  return response.data;
};

export const createOrder = async (data) => {
  const response = await api.post("/orders", data);
  return response.data;
};


// PAYMENTS
export const createPayment = async (data) => {
  const response = await api.post("/payments", data);
  return response.data;
};

export const getPayment = async (id) => {
  const response = await api.get(`/payments/${id}`);
  return response.data;
};


// DELIVERY
export const getDeliveries = async () => {
  const response = await api.get("/deliveries");
  return response.data;
};

export const getDelivery = async (id) => {
  const response = await api.get(`/deliveries/${id}`);
  return response.data;
};


// ACHIEVEMENTS
export const getAchievements = async () => {
  const response = await api.get("/achievements");
  return response.data;
};

export const getUserAchievements = async () => {
  const response = await api.get(
    "/achievements/user"
  );

  return response.data;
};
