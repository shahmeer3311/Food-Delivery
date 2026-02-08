import React from 'react'
import { useDispatch } from 'react-redux'
import { decrementItem, incrementItem, removeItem } from '../redux/cartSlice';
import { RiDeleteBin6Line } from "react-icons/ri";

const Cart2 = ({ id, image, title, price, quantity }) => {
    const dispatch=useDispatch();
  return (
    <div 
    className='w-full flex items-center justify-between px-5 py-3 shadow-lg h-[150px]'>
       <div className='w-[60%] h-full flex items-center gap-13'>
         <div className="w-[40%] h-full overflow-hidden">
          <img src={image} alt={title} className="object-cover rounded-lg h-full w-full" />
        </div>
        <div className='w-[20%] h-full flex flex-col items-center'>
             <div className="text-lg text-white font-semibold">{title}</div>
             <div className='w-[110px] h-[50px] flex rounded-lg overflow-hidden shadow-2xl'>
                <button
                onClick={()=>dispatch(decrementItem(id))}
                className='w-[30%] h-full flex items-center justify-center text-green-600 bg-white cursor-pointer'
                >
                -
                </button>
                <span className='w-[40%] h-full bg-slate-200 flex items-center justify-center'>
                {quantity}
                </span>
                <button
                onClick={()=>dispatch(incrementItem(id))}
                className='w-[30%] h-full flex items-center justify-center text-green-600 bg-white cursor-pointer'>
                +
                </button>
             </div>
        </div>
       </div>
       <div className='flex items-center flex-col gap-5'>
            <span className='text-xl text-green-400 font-semibold'>Rs: {price}</span>
            <button className='text-red-500 text-2xl font-bold cursor-pointer'>
               <RiDeleteBin6Line onClick={()=>dispatch(removeItem(id))} />
            </button>
         </div>     
       </div>
  )
}

export default Cart2
