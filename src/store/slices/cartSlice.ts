import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import apiServiceCall from "@/lib/apiServiceCall";
import { CartItem, CartState } from "./types";

 

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
      const newItem = action.payload;

      const existingIndex = state.cart.findIndex(
        (item) =>
          item.room_type.id === newItem.room_type.id &&
          item.hotel.id === newItem?.hotel?.id &&
          item.checkin_date === newItem.checkin_date &&
          item.checkout_date === newItem.checkout_date
      );

      if (existingIndex !== -1) {
        const updatedItem = {
          ...state.cart[existingIndex],
          quantity: (state.cart[existingIndex].quantity || 1) + 1,
        };

        state.cart[existingIndex] = updatedItem;
      } else {
         state.cart.push({ ...newItem, quantity: 1 });
      }
    },
    updateCartItem(
      state,
      action: PayloadAction<{ index: number; updatedItem: any }>
    ) {
      const { index, updatedItem } = action.payload;

      if (state.cart[index]) {
        state.cart[index] = {
          ...state.cart[index],
          ...updatedItem,
        };
      }
    },
    removeCartItem(
      state,
      action: PayloadAction<{
        roomTypeId: number;
        hotelId: number;
        checkin: string;
        checkout: string;
      }>
    ) {
      const { roomTypeId, hotelId, checkin, checkout } = action.payload;

      const index = state.cart.findIndex(
        (item) =>
          item.room_type.id === roomTypeId &&
          item.hotel.id === hotelId &&
          item.checkin_date.toString() === checkin &&
          item.checkout_date.toString() === checkout
      );

      if (index !== -1) {
        state.cart.splice(index, 1);
      }
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
