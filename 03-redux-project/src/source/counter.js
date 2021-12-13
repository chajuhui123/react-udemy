import { createSlice } from '@reduxjs/toolkit';

const initialCounterState = {counter : 0, showCounter : true}
const counterSlice = createSlice({
    name : 'counter', // 이름
    initialState : initialCounterState, // 초기값. initialState : initialState 로 설정하는 것과 같음
    reducers : {
        // 자동으로 최신 상태를 수신함. -> 리듀서 맵의 방법에서는 변수를 조작할 수 있음.
        // 리듀서를 식별하고 해당 리듀서를 대상으로 하는 작업을 전달 -> if 검사를 작성할 필요가 없다. 
        increment(state){
            state.counter++;
        },
        decrement(state){
            state.counter--;
        },
        // 페이로드를 위해, action을 매개변수로 받는다.
        increase(state, action){
            state.counter = state.counter + action.payload;
        },
        toggleCounter(state){
            state.showCounter = !state.showCounter;
        },
    },
})

export const counterActions = counterSlice.actions;
export default counterSlice.reducer;