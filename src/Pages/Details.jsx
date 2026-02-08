import React from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { useState,useEffect } from 'react';
import axios from 'axios';
import { IoMdArrowBack } from "react-icons/io";

const Details = () => {
  const { idMeal } = useParams();  
  const [meal, setMeal] = useState(null);
  const [videoLoading, setVideoLoading] = useState(true); 
  const navigate=useNavigate();

  useEffect(() => {
    const fetchMeal = async () => {
      const res = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
      );
      setMeal(res.data.meals[0]);
    };
    fetchMeal();
  }, [idMeal]);

  if (!meal) return <div className="text-center p-10">Loading...</div>;

  const youtubeId = meal.strYoutube?.split("v=")[1];

  return (
    <div className="w-full min-h-screen bg-black mx-auto pb-15 px-5">
      
      <div className='w-full h-10 flex items-center gap-15 pt-10 border-b-1 pb-10  border-gray-300 text-white'>
        <IoMdArrowBack 
          onClick={() => navigate(-1)}
          className='size-8 ml-5 cursor-pointer' 
        />
        <p className='text-2xl'>Food Detail</p>
      </div>

      <div className='flex items-center gap-5 mt-15 px-10'>

        <img
          src={meal.strMealThumb}
          className="rounded-lg w-full max-w-md mb-6 object-fit"
        />

        <div className="relative w-full h-111">

          {youtubeId && (
            <>
              {videoLoading && (
                <div className="absolute inset-0 flex justify-center items-center">
                  <div className="w-12 h-12 border-4 border-white/40 border-t-white rounded-full animate-spin"></div>
                </div>
              )}

              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}`}
                className="w-full h-full rounded-lg mb-6"
                allowFullScreen
                onLoad={() => setVideoLoading(false)} 
              ></iframe>
            </>
          )}

        </div>
      </div>

      <div className='text-white px-5'>
        <h1 className='text-3xl italic p-3'>Recipe:</h1>
       <ul className='list-disc list-inside space-y-2 text-lg'>
        {meal.strInstructions
        .split(".")
        .filter(step=>step.trim().length>0)
        .map((step,index)=>(
          <li key={index}>
            {step.trim()}.
          </li>
        ))
        }
       </ul>
      </div>
    </div>
  );
};

export default Details
