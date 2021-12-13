import classes from './Counter.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { counterActions } from '../source/counter';

const Counter = () => {
  const dispatch = useDispatch();
  // 구독을 자동으로 설정하기 때문에, 컴포넌트가 업데이트되고 데이터가 변경될 때마다 최신 데이터 값을 받게 된다.
  // 리액트 소토어가 변경될 때마다 컴포넌트 함수가 다시 실행된다. 항상 최신 counter 값을 갖는다.
  const counter = useSelector(state => state.counter.counter); 
  const show = useSelector(state => state.showCounter);

  const incrementHandler = () => {
    // 새로운 작업을 전달하며, type 속성을 객체를 보내준다.
    // dispatch({type : 'increment'});
    dispatch(counterActions.increment());
  };
  const increasetHandler = () => {
    // 사용자가 원하는 property를 추가할 수 있다.
    // dispatch({type : 'increase', amount : 5});
    // 이는 작업 객체를 생성하는데 형태가 다음과 같다. Payload 필드명은 변하지 않는다. 따라서 Store 파일에서는 action.payload를 통해 값에 접근한다.
    dispatch(counterActions.increase(5)); // {type : SOME_UNIQUE_IIDENTIFIER, payload : 5}
  };
  const decrementHandler = () => {
    // dispatch({type : 'decrement'});
    dispatch(counterActions.decrement());
  };

  const toggleCounterHandler = () => {
    // dispatch({type : 'toggle'});
    dispatch(counterActions.toggleCounter());
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {/* 조건을 작성할 수 있다. */}
      {show && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick = {incrementHandler}>Increment</button>
        <button onClick = {increasetHandler}>Increase by 5</button>
        <button onClick = {decrementHandler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;