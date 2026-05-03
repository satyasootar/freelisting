import axios from 'axios';

const api = axios.create({
  baseURL: '/api/v1/public',
  timeout: 10000,
});

async function request(endpoint, params = {}) {
  const { data: json } = await api.get(endpoint, { params });
  if (!json.success) throw new Error(json.message || 'Request failed');
  return json.data;
}

export function fetchProducts(page = 1, limit = 10) {
  return request('/randomproducts', { page, limit });
}

export function fetchQuotes(page = 1, limit = 10) {
  return request('/quotes', { page, limit });
}

export function fetchJokes(page = 1, limit = 10) {
  return request('/randomjokes', { page, limit });
}

export async function fetchRandomJoke() {
  const randomPage = Math.floor(Math.random() * 1465) + 1;
  const res = await request('/randomjokes', { page: randomPage, limit: 1 });
  return res.data[0];
}

export function fetchRandomCat() {
  return request('/cats/cat/random');
}

export function fetchMeals(page = 1, limit = 10) {
  return request('/meals', { page, limit });
}

export function fetchUsers(page = 1, limit = 10) {
  return request('/randomusers', { page, limit });
}

export async function fetchRandomUser() {
  const randomPage = Math.floor(Math.random() * 500) + 1;
  const res = await request('/randomusers', { page: randomPage, limit: 1 });
  return res.data[0];
}