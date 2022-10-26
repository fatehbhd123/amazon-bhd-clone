import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const exist = state.items.find((item) => item.id === action.payload.id);
      if (exist) {
        state.items = state.items.map((item) =>
          item.id === action.payload.id ? { ...action.payload, quantity: item.quantity + action.payload.quantity }
            : item
        )
      }
      else {
        state.items = [...state.items, action.payload]
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload.id)
    },
    updateProduct: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      state.items[index] = { ...state.items[index], quantity: state.items[index].quantity + action.payload.qty }
    }
  },
});

export const { addToCart, removeFromCart, updateProduct } = cartSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.cart.items;
export const selectTotal = (state) => state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

export default cartSlice.reducer;
