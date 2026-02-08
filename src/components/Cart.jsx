import React from "react";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import Cart2 from "./Cart2";

const Cart = ({ showCart, setShowCart }) => {
  console.log(showCart);
  const items = useSelector((state) => state.cart);
  console.log(items);
  const subTotal = items.reduce(
    (total, item) => total + item.quantity * item.price,
    0,
  );
  console.log(subTotal);
  const deliverFee = 20;
  const taxes = (subTotal * 0.5) / 100;
  const grandTotal = Math.floor(subTotal + deliverFee + taxes);
  return (
    <div
      className='w-full md:w-[40vw] h-full fixed transition-all duration-500 top-0 right-0 shadow-2xl bg-black/80 z-50 
    ${showCart ? "translate-x-0" : "translate-x-full"}'
    >
      <div className="flex items-center justify-between mt-5 px-5">
        <h1 className=" text-2xl font-bold italic text-green-700">Cart</h1>
        <RxCross2
          onClick={() => setShowCart(false)}
          className="text-white size-[30px] cursor-pointer hover:text-gray-600"
        />
      </div>
      <div className="h-[calc(100vh-60px)] overflow-y-auto px-6 pb-6 hideScroll">
        {items.map((item, index) => {
          return (
            <>
              <Cart2
                key={item.id}
                id={item.id}
                title={item.title}
                category={item.category}
                image={item.image}
                price={item.price}
                quantity={item.quantity}
                rating={item.rating}
                veg={item.veg}
                ingredients={item.ingredients}
              />
            </>
          );
        })}

        {items.length > 0 ? 
        (<>
        <div className="w-full border-t-2 border-b-2 border-gray-400 mt-7 flex flex-col gap-2 p-8">
      <div className="w-full flex items-center justify-between">
        <span className="text-lg text-gray-600 font-semibold">Subtotal</span>
        <span className="text-green-400 font-semibold text-lg">Rs {subTotal}</span>
      </div>
      <div className="w-full flex items-center justify-between">
        <span className="text-lg text-gray-600 font-semibold">Delivery Fee</span>
        <span className="text-green-400 font-semibold text-lg">Rs {deliverFee}</span>
      </div>
      <div className="w-full flex items-center justify-between">
        <span className="text-lg text-gray-600 font-semibold">Taxes</span>
        <span className="text-green-400 font-semibold text-lg">Rs {taxes.toFixed(2)}</span>
      </div>
    </div>

     <div className="w-full flex items-center justify-between p-9">
      <span className="text-2xl text-gray-600 font-semibold">Total</span>
      <span className="text-green-400 font-semibold text-2xl">Rs {grandTotal}</span>
    </div>
     <button
      className="w-full bg-green-500 hover:bg-green-600 text-white text-sm font-semibold py-2 rounded-lg shadow-md transition-colors cursor-pointer"
    >
      Place Order
    </button>
        </>)
         : 
        (<>
        <div className='text-center text-2xl text-green-500 font-semibold pt-5'>Empty Cart</div>
        </>)}
      </div>
    </div>
  );
};

export default Cart;

