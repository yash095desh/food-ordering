import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/User'

export const makeStore = () => {
  return configureStore({
    reducer: {
        User:userReducer ,
    },
  })
}