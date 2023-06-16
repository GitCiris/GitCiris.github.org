import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useUserStore } from "./userStore";
import { insertCartAPI,findNewCartListAPI,delCartAPI } from "@/apis/cart";
export const useCartStore= defineStore('cart',()=>{
    const userStore=useUserStore()
    const isLogin=computed(()=>userStore.userInfo.token)

    const updateNewList=async()=>{
        const res=await findNewCartListAPI()
           cartList.value=res.result
    }
    const cartList=ref([])
    const addCart=async(goods)=>{
        // 已添加国
        const {skuId,count} =goods
        if(isLogin.value){
            // 
           await insertCartAPI({skuId,count})
           updateNewList()
        }else{
        const item= cartList.value.find((item)=>goods.skuId===item.skuId)
        if(item){
            item.count++
        }else{
            cartList.value.push(goods)
        }
        }

       
    }
    const delCart=async(skuId)=>{

        if(isLogin.value){
            await delCartAPI([skuId])
            updateNewList()
        }else{
        const idx=cartList.value.findIndex((item)=>skuId===item.skuId)
        cartList.value.splice(idx,1)
        }
        
    }
    const clearCart=()=>{
        cartList.value=[]
    }
    
    // 单选功能
    const singleCheck=(skuId,selected)=>{
        const item =cartList.value.find((item)=>item.skuId===skuId)
        item.selected=selected
    }
// 全选功能
    const allCheck=(selected)=>{
        // 把cartlist中的每一项selected都设置为当前的全选框状态
         cartList.value.forEach(item=>item.selected=selected)
    }

    // 计算属性
    const allCount= computed(()=>cartList.value.reduce((a,c)=>a+c.count,0))
    const allPrice= computed(()=>cartList.value.reduce((a,c)=>a+c.count*c.price,0))
    const selectedCount=computed(()=>cartList.value.filter(item=>item.selected).reduce((a,c)=>a+c.count,0))
    const selectedPrice=computed(()=>cartList.value.filter(item=>item.selected).reduce((a,c)=>a+c.count*c.price,0))

    const isAll= computed(()=>cartList.value.every((item)=>item.selected))
    return {
        cartList,
        addCart,
        delCart,
        allCount,
        allPrice,
        isAll,
        singleCheck,
        allCheck,
        selectedCount,
        selectedPrice,
        clearCart,
        updateNewList
    }
},{
    persist: true,
  })
