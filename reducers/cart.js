import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.name === action.payload.name
      );
      if (existingItem) {
        // Si l'article existe déjà dans le panier, incrémente la quantité
        existingItem.quantity += 1;
      } else {
        // Sinon, ajouter avec une quantité de 1
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },

   decrementFromCart: (state, action) => {
      const itemToDecrement = state.items.find(
        (item) => item.name === action.payload.name
      );
      if (itemToDecrement) {
        // Décrémente la quantité de l'article, en le retirant si la quantité atteint 0
        if (itemToDecrement.quantity > 1) {
          itemToDecrement.quantity -= 1;
        } else {
          state.items = state.items.filter(
            (item) => item.name !== action.payload.name
          );
        }
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item.name !== action.payload.name
      );
    }
  },
});

export const { addToCart, decrementFromCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
