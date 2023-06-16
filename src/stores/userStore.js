
import { loginAPI } from "@/apis/use";

import { defineStore } from "pinia";
import { useCartStore } from "./cartStore";
import {ref} from 'vue'
import {mergeCartAPI} from '@/apis/cart'
export const useUserStore=defineStore('user',()=>{
    const cartStore=useCartStore()
    const userInfo=ref({})
    const getUserInfo=async({account,password})=>{
     const res= await loginAPI({account,password})
     userInfo.value=res.result
        await mergeCartAPI(cartStore.cartList.map(item=>{
            return {
                skuId:item.skuId,
                selected:item.selected,
                count:item.count
            }
        }))
        cartStore.updateNewList()
    }

    const clearUserInfo=()=>{
        userInfo.value={}
        // 执行清楚购物车的action
        cartStore.clearCart()

    }
    return {
        userInfo,
        getUserInfo,
        clearUserInfo 
    }
},{
    persist: true,
  })