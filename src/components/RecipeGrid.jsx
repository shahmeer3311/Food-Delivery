import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaLeaf, FaDrumstickBite, FaStar } from "react-icons/fa";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import {useNavigate} from "react-router-dom"
import {useDispatch} from "react-redux"
import {AddItems} from "../redux/cartSlice"

const RecipeGrid = ({ category, input }) => {
  const [apiData, setApiData] = useState([]);
  const [hovered, setHovered] = useState(null);

  const navigate=useNavigate();
  const dispatch=useDispatch();

  console.log(input);
  useEffect(() => {
    const fetchData = async () => {
      let url =
        category && category !== "All"
          ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
          : input
          ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`
          : "https://www.themealdb.com/api/json/v1/1/search.php?s=";

      const res = await axios.get(url);

      let meals = res.data.meals || [];

      let detailedMeals = meals;

      if (category && category !== "All") {
        detailedMeals = await Promise.all(
          meals.map(async (meal) => {
            const detailRes = await axios.get(
              `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
            );
            return detailRes.data.meals[0];
          })
        );
      }

      const updatedMeals = detailedMeals.map((meal) => ({
        ...meal,
        price: Math.floor(Math.random() * 500) + 100,
        rating: Math.floor(Math.random() * 5) + 1,
      }));

      setApiData(updatedMeals);
    };

    fetchData();
  }, [category, input]);

  const isVeg = (mealCategory = "", title = "") => {
    const nonVegKeywords = [
      "meat",
      "chicken",
      "pork",
      "beef",
      "fish",
      "lamb",
      "mutton",
      "shrimp",
      "bacon",
      "turkey",
    ];

    return nonVegKeywords.some(
      (m) =>
        mealCategory.toLowerCase().includes(m) ||
        title.toLowerCase().includes(m)
    );
  };

  const handleText = (title) =>
    title.length > 15 ? title.slice(0, 15) + "..." : title;

  if (!apiData || apiData.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center mt-20">
        <img src="/empty.png" className="w-40 h-40 opacity-70" alt="No data" />
        <h2 className="text-xl mt-5 text-gray-500 font-medium">
          No dishes found for this category.
        </h2>
      </div>
    );
  }

  const getIngredients = (meal) => {
    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
      let ing = meal[`strIngredient${i}`];
      let measure = meal[`strMeasure${i}`];
      if (ing) ingredients.push(`${measure} ${ing}`);
    }
    return ingredients;
  };

  const handleAdd=(item)=>{
     dispatch(AddItems({
      id: item.idMeal,
        title: item.strMeal,
        category: item.strCategory,
        image: item.strMealThumb,
        price: item.price || (Math.random() * 20 + 5).toFixed(2),
        rating: item.rating,
     }))
  }

  return (
    <div className="w-full grid grid-cols-4 gap-2 mt-15 px-5">
      {apiData.map((meal) => {
        const veg = isVeg(meal.strCategory, meal.strMeal);
        const ingredients = getIngredients(meal);
        return (
          <div
            key={meal.idMeal}
            onMouseEnter={() => setHovered(meal.idMeal)}
            onMouseLeave={() => setHovered(null)}
            className="w-[320px] h-[400px] rounded-2xl shadow-2xl bg-white mb-5 cursor-pointer relative overflow-hidden"
          >
            <div className="w-[320px] h-[250px] overflow-hidden">
              <img
                src={meal.strMealThumb}
                className="rounded-md w-full h-full object-cover"
              />
            </div>

            <div className="flex items-center justify-between mt-5 px-3 text-2xl">
              <h2 className="text-[17px] font-bold">
                {handleText(meal.strMeal)}
              </h2>

              {veg ? (
                <FaDrumstickBite className="text-red-600 size-6" />
              ) : (
                <FaLeaf className="text-green-600 size-6" />
              )}
            </div>

            <div className="flex items-center justify-between mt-4 px-3 text-[16px]">
              <h3>{meal.strCategory}</h3>
              <p className="text-green-600">${meal.price}</p>
            </div>

            <button 
            onClick={()=>handleAdd(meal)}
            className="w-[90%] h-10 ml-3 rounded-full bg-green-600 text-white mt-3 cursor-pointer">
              Add to Cart
            </button>
            {hovered === meal.idMeal && (
              <div className="absolute inset-0 h-[63%] rounded-b-xl bg-black/50 flex flex-col items-center justify-center p-3">
                <div className="flex items-center gap-2 mb-2 bg-white absolute top-5 left-4 rounded-2xl px-3">
                  <FaStar className="text-yellow-400" />
                  <span className="text-sm font-bold">{meal.rating}/5</span>
                </div>
                <p className="text-xs text-white text-center font-bold line-clamp-3">
                  {ingredients.slice(0, 5).join(", ")}
                </p>
                <button 
                className="absolute bottom-5 right-6 rounded-2xl bg-yellow-500 p-2 text-white 
                flex items-center justify-center gap-1.5 cursor-pointer"
                onClick={()=>navigate(`/detail/${meal.idMeal}`)}
                >
                  View Details
                  <MdOutlineArrowForwardIos />
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default RecipeGrid;
