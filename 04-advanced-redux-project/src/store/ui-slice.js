import { createSlice } from '@reduxjs/toolkit';


const uiSlice = createSlice({
    name : 'ui',
    initialState : {cartIsVisible : false, notification : null,},
    reducers : {
        toggle(state){
            // 변형 코드를 작성할 수 있는 이유 :
            // 리덕스 툴킷을 활용할 땐 내부적으로 상태를 실제로 변형하지 않음 (기존 형태 유지)
            // -> imur 라이브러리를 활용해 변경 불가한 코드로 변환. 따라서 기존 상태를 변경하는 것이 아닌, 새로운 객체를 반환.
            state.cartIsVisible = !state.cartIsVisible; //전환
        },
        showNotification(state, action){
            state.notification = {
                status : action.payload.status ,
                title : action.payload.title ,
                message : action.payload.message , 
            };
        },
    },
});

export const uiActions = uiSlice.actions;
export default uiSlice;