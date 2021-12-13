import { configureStore } from '@reduxjs/toolkit'

// 장바구니 전환(toggle)용 슬라이스
import uiSlice from './ui-slice';
// 장바구니 관리용 슬라이스
import cartSlice from './cart-slice';


const store = configureStore({
    reducer : {ui : uiSlice.reducer, cart : cartSlice.reducer, }
})

export default store;