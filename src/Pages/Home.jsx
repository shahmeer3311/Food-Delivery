import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Category from '../components/Category'
import RecipeGrid from '../components/RecipeGrid';
import Cart from '../components/Cart';

const Home = () => {
    const [category,setCategory]=useState("All");
    const [input,setInput]=useState("");
    const [showCart,setShowCart]=useState(false);
  return (
    <div className='w-full min-h-screen h-full bg-slate-200'>
      {showCart && <Cart showCart={showCart} setShowCart={setShowCart} />}
      <Navbar input={input} setInput={setInput} showCart={showCart} setShowCart={setShowCart} />
      <Category category={category} setCategory={setCategory} />
      <RecipeGrid category={category} input={input} />
    </div>
  )
}

export default Home
