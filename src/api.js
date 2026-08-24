
// ============================================================
// BIGF API CONNECTION
// ============================================================

const API_BASE_URL = "http://127.0.0.1:5000";

// Generic request helper
async function request(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      data.message ||
      data.error ||
      `Request failed with status ${response.status}`
    );
  }

  return data;
}


// ============================================================
// HEALTH CHECK
// ============================================================

export async function checkBackend() {
  return request("/health");
}


// ============================================================
// RECIPES
// ============================================================

export async function getRecipes() {
  return request("/recipes");
}

export async function getRecipe(recipeId) {
  return request(`/recipes/${recipeId}`);
}


// ============================================================
// INGREDIENTS
// ============================================================

export async function getIngredients() {
  return request("/ingredients");
}

export async function getIngredient(ingredientId) {
  return request(`/ingredients/${ingredientId}`);
}


// ============================================================
// POSTS
// ============================================================

export async function getPosts() {
  return request("/posts");
}

export async function getPost(postId) {
  return request(`/posts/${postId}`);
}


// ============================================================
// SHOP
// ============================================================

export async function getCategories() {
  return request("/shop/categories");
}

export async function getProducts() {
  return request("/shop/products");
}

export async function getProduct(productId) {
  return request(`/shop/products/${productId}`);
}


// ============================================================
// CART
// ============================================================

export async function getCart(userId) {
  return request(`/shop/cart/${userId}`);
}

export async function getCartItems(cartId) {
  return request(`/shop/cart/${cartId}/items`);
}


// ============================================================
// DEFAULT EXPORT
// ============================================================

const api = {
  checkBackend,
  getRecipes,
  getRecipe,
  getIngredients,
  getIngredient,
  getPosts,
  getPost,
  getCategories,
  getProducts,
  getProduct,
  getCart,
  getCartItems,
};

export default api;
