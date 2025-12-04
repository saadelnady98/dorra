import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import apiServiceCall from "@/lib/apiServiceCall";

export interface CartItem {
  id: number;
  images: any[];
  checkin_date: Date;
  checkout_date: Date;
  adults: number;
  ages: number[];
  children: number;
  price_per_night: number;
  room_type: any;
  hotel: any;
}

interface CartState {
  cart: CartItem[];
  loading: boolean;
  error: string | null;
}

// Async thunk لاضافة المنتج للAPI
export const addToCartAPI = createAsyncThunk(
  "cart/addToCartAPI",
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await apiServiceCall({
        url: "cart",
        method: "POST",
        body: payload,
      });
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err?.errors?.message || "Error occurred");
    }
  }
);

const initialState: CartState = {
  cart: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartItem(state, action: PayloadAction<CartItem>) {
      state.cart.push(action.payload);
    },
    updateCartItem(
      state,
      action: PayloadAction<{ index: number; updatedItem: CartItem }>
    ) {
      state.cart[action.payload.index] = action.payload.updatedItem;
    },
    removeCartItem(state, action: PayloadAction<number>) {
      state.cart.splice(action.payload, 1);
    },
    removeCart(state) {
      state.cart = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAPI.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCartAPI.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(addToCartAPI.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addCartItem, updateCartItem, removeCartItem, removeCart } =
  cartSlice.actions;

export default cartSlice.reducer;
