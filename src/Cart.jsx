import React, { useContext, useState } from 'react';
import CartCard from './components/CartCard';
import { CartContext } from './CartContext';
import http from "./http";
import cookies from "js-cookies";

function Cart() {
  const { cart, totalPrice, totalNetPrice } = useContext(CartContext);
  const [discount, setDiscount] = useState(0);

  const handleDiscountChange = (e) => {
    const inputDiscount = parseFloat(e.target.value);
    setDiscount(inputDiscount);
  };

  const discountedTotal = totalPrice - discount || 0;

  function checkout(){
    let checkoutCart = {...cart};
    console.log(cart)
    console.log(totalNetPrice)
    http.POST("/products/checkout", {...cart, discount, discountedTotal, totalNetPrice}, {
      headers:{
        "Authorization" : cookies.getItem("token")
      }
    })
    .then((res)=>{
      console.log(res);
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  return (
    <div className="h-screen bg-gray-100 pt-20">
      <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        {/* Cart items */}
        {cart.map((item) => (
          <CartCard data={item} key={item.product._id} />
        ))}
        {/* Subtotal */}
        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Subtotal</p>
            <p className="text-gray-700">{totalPrice} EGP</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Discount</p>
            <input
              type="number"
              value={discount}
              onChange={handleDiscountChange}
              className="w-20 h-8 px-2 border rounded-md"
            />
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total</p>
            <div>
              <p className="mb-1 text-lg font-bold">{discountedTotal} EGP</p>
              <p className="text-sm text-gray-700">including VAT</p>
            </div>
          </div>
          <button onClick={checkout} className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">
            Check out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
