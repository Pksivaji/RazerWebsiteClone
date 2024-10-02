
import React, { useState } from 'react';
import HeadsetsData from '../JsonDatas/headSets.json';
import './styles/keyboard.css';
import { useCart } from '../CartContext';


function SearchHeadset() {
  const [selectedBrands, setSelectedBrands] = useState(new Set()); // Use Set for efficient duplicate handling
  const [selectedRating, setSelectedRating] = useState(new Set()); // Use Set for efficient duplicate handling
  const [filterVisible, setFilterVisible] = useState(true);
 
  const brandHandler = (brand) => {
    const isSelected = selectedBrands.has(brand);
    setSelectedBrands(isSelected ? new Set([...selectedBrands].filter(item => item !== brand)) : new Set([...selectedBrands, brand]));
  };

  const ratingHandler = (rating) => {
    const isSelected = selectedRating.has(rating);
    setSelectedRating(isSelected ? new Set([...selectedRating].filter(item => item !== rating)) : new Set([...selectedRating, rating]));
  };

  const handleCancel = () => {
    setFilterVisible(false); // Hide filter section
  };
  const handleVisible = () => {
    setFilterVisible(true); // Hide filter section
  };

  //---------add items to cart CUSTOME HOOk('useCart()')------//
  const {addToCart,cartItems}=useCart();

  return (
    <div className='laptopsDiv'>
      <h1 style={{position:"absolute",color:'black',top:'160px',left:'10px',cursor:"pointer"}}><i class="fa-solid fa-filter d-block d-md-none" onClick={handleVisible}></i>
</h1>
      {filterVisible && (
      <div className='filterDiv'>
        {/* ---filter 1 starts */}
        <div className='Lapfilter1'>
          <i class="fa-solid fa-x d-block d-md-none" onClick={handleCancel}></i>
          <h4 style={{ backgroundColor: "gray", color: '', borderRadius: "1px", }}>Brand Filter</h4>
          {HeadsetsData.map((headset) => (
            <div key={headset.brand}>
              <label>
                <input
                  type='checkbox'
                  checked={selectedBrands.has(headset.brand)}
                  onChange={() => brandHandler(headset.brand)} // Use arrow function for consistent 'this'
                />
                {
                  headset.brand
                }
              </label>
            </div>
          ))}
        </div>
        {/* ----filter 2- starts---- */}
        <div className='Lapfilter2'>
          <h4 style={{ backgroundColor: "gray", color: '', borderRadius: "1px"}}>Rating Filter</h4>
          {HeadsetsData.map((headset) => (
            <div key={headset.rating}>
              <label>
                <input
                  type='checkbox'
                  checked={selectedRating.has(headset.rating)}
                  onChange={() => ratingHandler(headset.rating)} // Use arrow function for consistent 'this'
                />
                {
                 headset.rating
                }
              </label>
            </div>
          ))}
        </div>
      </div>)}
      {/* -----------content Div--------------- */}
      <div className='contentDiv'>
        {HeadsetsData.filter((item) => (
          (!selectedBrands.size || selectedBrands.has(item.brand)) &&
          (!selectedRating.size || selectedRating.has(item.rating))
        )).map((item) => (
          <div key={item.id} className='d-flex m-2 flex-md-column flex-sm-column flex-column flex-lg-row rounded p-2 itemDiv'>
            <div className='p-2 d-flex justify-content-center' style={{}}>
              <img src={item.image} className='p-2 w-sm-100 cus-ImgWidth' alt={item.name} /> {/* Add alt text for accessibility */}
            </div>
            {/* -----div2----- */}
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
             </div>
            {/* -----------div 3------------- */}
            <div className='w-25 text-center align-center py-lg-5 div3'>
              <h3>₹{(Math.floor(item.price * 12)).toLocaleString()} Rs</h3>
              <h6 className='text-muted'>
                <del>{(Math.floor(item.price*15))}</del> 
                <span className='originalDiscount'>{item.discount_percentage}% off</span>
              </h6>
              <h6 style={{ color: 'green' }}>Save Extra with Combo offers</h6>
              <h5 style={{ color: 'green' }}>Bank Offer</h5>
              <button className='btn btn-success mt-3' onClick={()=>addToCart(item)}>Add Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchHeadset;
