import {createSlice} from "@reduxjs/toolkit"
import { act } from "react";

const cartSlice=createSlice({
    name: "cart",
    initialState: [],
    reducers: {
        AddItems: (state,action)=>{
            const existing=state.find(p=>p.id===action.payload.id);
            if(existing){
                existing.quantity+=1;
            }else{
                state.push({...action.payload,quantity: 1});
            }
        },
        incrementItem: (state,action)=>{
            console.log(action);
            console.log("incrementing item with id:", action.payload);
             const item=state.find(p=>p.id===action.payload);
             console.log("incrementing item with id:", action.payload);
             if(item) item.quantity+=1;
        },
        decrementItem: (state,action)=>{
             const item=state.find(p=>p.id===action.payload);
             if(item && item.quantity>1){
                item.quantity-=1;
             }
        },
        removeItem: (state,action)=>{
            return state.filter(i=>i.id!==action.payload);
        }
    }
});

export const {AddItems,incrementItem,decrementItem,removeItem}=cartSlice.actions;
export default cartSlice.reducer;