import React from 'react'
import { MdFastfood } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { LuShoppingBag } from "react-icons/lu";

const Navbar = ({input,setInput}) => {
  return (
    <div className='w-full flex items-center justify-between p-5'>
      <div className='size-15 flex items-center justify-center rounded-2xl shadow-2xl bg-white'>
        <MdFastfood className='size-9 text-green-700' />
      </div>
      <div className='w-[70%] flex items-center border border-gray-200 bg-white px-5 py-3.5 rounded-2xl shadow-2xl'>
        <IoSearch className='size-7 text-green-700'  />
        <input 
        type="text" 
        value={input}
        onChange={(e)=>setInput(e.target.value)}
         className="border-none outline-none pl-5 text-xl text-gray-500"
         placeholder='Seach Something......'
        />
      </div>
      <div className='size-15 flex items-center justify-center rounded-2xl shadow-2xl bg-white'>
        <LuShoppingBag className='size-9 text-green-700' />
      </div>
    </div>
  )
}

export default Navbar
