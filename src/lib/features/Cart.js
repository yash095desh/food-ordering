import { createSlice } from '@reduxjs/toolkit'





const initialState = {
  products : []
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {

    
  },
})

// Action creators are generated for each case reducer function
export const { add,remove,clearCart,setCartItems} = cartSlice.actions

export default cartSlice.reducer