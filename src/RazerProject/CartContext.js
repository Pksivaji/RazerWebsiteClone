import { createContext, useContext, useState} from "react";

const cartContext=createContext();



export const CartProvider=({children})=>{
    const [cartItems,setCartItems]=useState([])
    
    const addToCart=(item)=>{
        setCartItems([...cartItems,item])
    }

    const removeFromCart=(item)=>{
        setCartItems(cartItems.filter((apple)=>apple.id!==item))
    }

    return(
        <cartContext.Provider value={{cartItems,addToCart,removeFromCart}}>
            {children}
        </cartContext.Provider>
    )
 }

 export const useCart=()=>{
    return useContext(cartContext)
 }