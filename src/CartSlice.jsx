import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalItems: 0
  },
  reducers: {
    addItem: (state, action) => {
        const {name, image, cost} = action.payload;
        const existingItem = state.items.find((item) => item.name === name)
        console.log(existingItem);
        if(existingItem) {
            existingItem.quantity++;
        } else {
            state.items.push({ name, image, cost, quantity: 1});
        }
    },

    removeItem: (state, action) => {
        const {name} = action.payload;
        state.items = state.items.filter(item => item.name !== name);
    },

    updateQuantity: (state, action) => {
        const {name, quantity} = action.payload
        const itemToUpdate = state.items.find(item => item.name === name);
        if(itemToUpdate.quantity > 0) {
            itemToUpdate.quantity = quantity;
        } 
    },

    calculateTotalItems: (state) => {
        let total = 0;
        state.items.map((plants) => {
            total += plants.quantity;
        })

        state.totalItems = total;
    }
  },
});

export const { addItem, removeItem, updateQuantity, calculateTotalItems } = CartSlice.actions;

export default CartSlice.reducer;
