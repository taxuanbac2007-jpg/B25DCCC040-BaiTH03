import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export const fetchProducts = createAsyncThunk<Product[]>('fetchProducts', async () => {
  const res = await fetch('https://fakestoreapi.com/products');
  return (await res.json()) as Product[];
});

const productSlice = createSlice({
  name: 'products',
  initialState: { items: [] as Product[], status: 'idle' as string, error: null as string | null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchProducts.fulfilled, (state, action) => { state.status = 'succeeded'; state.items = action.payload; })
      .addCase(fetchProducts.rejected, (state, action) => { state.status = 'failed'; state.error = action.error.message || ''; });
  },
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] as CartItem[] },
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const item = state.items.find((i) => i.product.id === action.payload.id);
      if (item) item.quantity += 1;
      else state.items.push({ product: action.payload, quantity: 1 });
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((i) => i.product.id !== action.payload);
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.items.find((i) => i.product.id === action.payload.id);
      if (item) {
        if (action.payload.quantity <= 0) state.items = state.items.filter((i) => i.product.id !== action.payload.id);
        else item.quantity = action.payload.quantity;
      }
    },
    clearCart: (state) => { state.items = []; },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export const productReducer = productSlice.reducer;
export const cartReducer = cartSlice.reducer;