'use client'
import { setCartItems, setUser } from '@/lib/features/User'
import { makeStore } from '@/lib/strore'
import { useSession } from 'next-auth/react'
import { useEffect, useRef } from 'react'
import { Provider } from 'react-redux'

export default function StoreProvider({ children }) {
    const storeRef = useRef()
    const {data:session,status} = useSession()
    const email = session?.user?.email ;


    useEffect(()=>{
        if ( typeof window !== 'undefined') {
            storeRef.current.dispatch(setUser(session?.user))
            const items =  localStorage.getItem(`${email}-cartItems`) !== null ? JSON.parse(localStorage.getItem(`${email}-cartItems`)) : []
            storeRef.current.dispatch(setCartItems(items))
          }
    },[session])

  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()

  }

  return <Provider store={storeRef.current}>{children}</Provider>
}