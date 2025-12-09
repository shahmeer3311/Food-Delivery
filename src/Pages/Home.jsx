import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Category from '../components/Category'
import RecipeGrid from '../components/RecipeGrid';

const Home = () => {
    const [category,setCategory]=useState("All");
  return (
    <div className='w-full min-h-screen h-full bg-slate-200'>
      <Navbar  />
      <Category category={category} setCategory={setCategory} />
      <RecipeGrid category={category} />
    </div>
  )
}

export default Home
