import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaLeaf, FaDrumstickBite, FaStar } from "react-icons/fa";

// https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`
// `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedType}`
// "https://www.themealdb.com/api/json/v1/1/search.php?s=";

const RecipeGrid = ({ category }) => {
  const [apiData, setApiData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/search.php?s="
      );
      console.log(res.data.meals);
      setApiData(res.data.meals);
    };
    fetchData();
  }, []);

  const handleText = (title) => {
    return title.length > 15 ? title.slice(0, 15) + "...." : title;
  };

  const isVeg = (mealCategory, title) => {
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

  return (
    <div className="w-full grid grid-cols-4 gap-2 mt-15 px-5">
      {apiData.map((meal) => {
        const veg = isVeg(meal.strCategory, meal.strMeal);
        console.log(veg);
        return (
          <div
            key={meal.idMeal}
            className="w-[320px] h-[400px] rounded-2xl shadow-2xl bg-white mb-5"
          >
            <div className="w-[320px] h-[250px] rounded-2xl   overflow-hidden">
              <img
                src={meal.strMealThumb}
                className="rounded-md w-full h-full object-fit"
              />
            </div>
            <div className="flex items-center justify-between mt-2 px-3 text-2xl">
              <h2 className="text-[17px] font-bold">
                {handleText(meal.strMeal)}
              </h2>
              {veg ? (
                <FaDrumstickBite
                  className="text-red-600 text-lg size-6"
                  title="Non-Veg"
                />
              ) : (
                 <FaLeaf className="text-green-600 text-lg size-6" title="Vegetarian" />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RecipeGrid;
