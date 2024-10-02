import React from 'react'
import { useCart } from './CartContext'

const UserCart = () => {
   const { cartItems, removeFromCart } = useCart();

   const handleRemoveItem = (itemId) => {
      removeFromCart(itemId);
   };

   return (
      <div style={{ backgroundColor: "black", color: "white" }} className=''>
         <center>
            <h1 className='pt-3'> Cart Items</h1>
            <p style={{ color: 'gray' }} className=''>Added Items are displayed at here</p>
         </center>
         {cartItems.map((item) => {
            return (
               <div key={item.id} className='d-flex m-2 flex-md-column flex-sm-column flex-column flex-lg-row rounded p-2 itemDiv mt-4 bg-dark'>
                  <div className='p-2 d-flex justify-content-center'>
                     <img src={item.image} className='p-2 w-sm-100 cus-ImgWidth' alt={item.name} />
                  </div>
                  <div className='w-50 px-5 p-4 rounded div2'>
                     <h4 className='div2title'>{item.name}</h4>
                     <h5>{item.brand}</h5>
                     <span className='d-flex gap-2' style={{ height: '30px' }}>
                        <p className='rating'>{item.rating}<i className="fa-solid fa-star"></i></p>
                        <span className='d-flex text-muted'>
                           <p>{Math.floor(item.rating * 350)} Ratings &</p>
                           <p>{Math.floor(item.rating * 110)} Reviews</p>
                        </span>
                     </span>
                     <h6>{(Math.floor(item.price * 30).toLocaleString())} Rs</h6>
                     <button className='btn btn-danger' onClick={() => handleRemoveItem(item.id)}>Remove</button>
                  </div>
               </div>
            );
         })}
      </div>
   );
}

export default UserCart;
