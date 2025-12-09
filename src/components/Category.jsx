import React from "react";
import { TiThSmallOutline } from "react-icons/ti";
import { MdOutlineFreeBreakfast, MdOutlineSoupKitchen, MdOutlineFastfood } from "react-icons/md";
import { GiFullPizza, GiNoodles } from "react-icons/gi";
import { FaHamburger, FaUtensils } from "react-icons/fa";

const Category = ({category,setCategory}) => {
    const categories = [
    { id: 1, name: "All", image: <TiThSmallOutline className="size-[50px] text-green-600" /> },
    { id: 2, name: "Breakfast", image: <MdOutlineFreeBreakfast className="size-[50px] text-green-600" /> },
    { id: 3, name: "Soup", image: <MdOutlineSoupKitchen className="size-[50px] text-green-600" /> },
    { id: 4, name: "Pasta", image: <GiNoodles className="size-[50px] text-green-600" /> },
    { id: 5, name: "Main Course", image: <FaUtensils className="size-[50px] text-green-600" /> },
    { id: 6, name: "Pizza", image: <GiFullPizza className="size-[50px] text-green-600" /> },
    { id: 7, name: "Burger", image: <FaHamburger className="size-[50px] text-green-600" /> },
  ];
  return (
    <div className="w-[70%] mx-auto flex items-center gap-5">
      {categories.map((c)=>(
        <div 
        key={c.id}
        onClick={()=>setCategory(c.name)}
        className={`size-35 rounded-2xl shadow-2xl flex flex-col gap-2.5 items-center justify-center
        ${category===c.name  ?  
            "bg-green-300 scale-105" : "bg-white hover:bg-green-200 hover:scale-105"}
        `}>
         {c.image}
        <p className="text-[16px]">{c.name}</p>
        </div>
      ))}
    </div>
  )
}

export default Category
