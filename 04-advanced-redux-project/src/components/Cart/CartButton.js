import classes from './CartButton.module.css';
import { uiActions } from '../../store/ui-slice';
import { useDispatch, useSelector } from 'react-redux';

const CartButton = (props) => {
  const dispatch = useDispatch();
  const cartQuantity = useSelector((state)=> state.cart.totalQuantity);
  const toggleButtonHandler = () =>{
    dispatch(uiActions.toggle());
    // 해당 dispatch 작업으로 인해 변경되는 값은 App.js 에서 useSelector 통해 불러와, 컴포넌트를 보여주거나 숨김.
  };
  return (
    // 해당 버튼이 클릭되었을 때(onClick), 토글이 생겼다 사라졌다.
    <button className={classes.button} onClick={toggleButtonHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartQuantity}</span>
    </button>
  );
};

export default CartButton;
