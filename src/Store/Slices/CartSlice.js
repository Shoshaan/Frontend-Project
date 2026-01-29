import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addToCart(state, action) {
      const product = action.payload;

      const exists = state.items.find((item) => item.product.id === product.id);

      if (!exists) {
        state.items.push({
          product,
          quantity: 1,
        });
      }
    },

    removeFromCart(state, action) {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.product.id !== productId);
    },

    updateQuantity(state, action) {
      const { productId, quantity } = action.payload;
      const item = state.items.find((item) => item.product.id === productId);

      if (item && quantity > 0) {
        item.quantity = quantity;
      }
    },

    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
