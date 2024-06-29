import { createSlice } from '@reduxjs/toolkit'



const initialState = {
  User : {
    user: null ,
    products:[]
}
}

export const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    setUser:(state,action)=>{
        state.User.user = action.payload ;
    },
    logOut:(state,action)=>{
        state.User.user = {}
    },
    setCartItems:(state,action)=>{
        state.User.products = action.payload ;
    },
    add:(state,action)=>{
        let email = state?.User?.user?.email ;
        if(state.User.products === null){
            state.User.products = [action.payload]
        }else{
            state.User.products.push(action.payload)
        }
        localStorage.setItem(`${email}-cartItems`,JSON.stringify(state.User.products))
    },
    remove:(state,action)=>{
        let email = state?.User?.user?.email ;
        state.User.products = state.User.products.filter((item,index)=> index !== action.payload )
        localStorage.setItem(`${email}-cartItems`,JSON.stringify(state.User.products))
    },
    clearCart:(state,action)=>{
        let email = state?.User?.user?.email ;
        state.User.products = []
        localStorage.setItem(`${email}-cartItems`,JSON.stringify(state.User.products))
    }
    
  },
})

export const { setUser,logOut ,setCartItems,add,remove,clearCart} = userSlice.actions

export default userSlice.reducer