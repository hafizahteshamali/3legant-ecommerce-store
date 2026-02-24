import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // ✅ backend se full cart set
    setCart(state, action) {
      state.items = action.payload.items || [];
    },

    // ✅ add to cart
    addItem(state, action) {
      // payload: { product: "id", quantity: number }

      const existingItem = state.items.find(
        (item) => item.product === action.payload.product
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },

    // ✅ increase quantity
    increaseQty(state, action) {
      const item = state.items.find(
        (i) => i.product === action.payload
      );
      if (item) {
        item.quantity += 1;
      }
    },

    // ✅ decrease quantity (NEW — important)
    decreaseQty(state, action) {
      const item = state.items.find(
        (i) => i.product === action.payload
      );

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    // ✅ remove item
    removeItem(state, action) {
      state.items = state.items.filter(
        (item) => item.product !== action.payload
      );
    },

    // ✅ clear cart
    clearCart(state) {
      state.items = [];
    },
  },
});

export const {
  setCart,
  addItem,
  increaseQty,
  decreaseQty,
  removeItem,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;