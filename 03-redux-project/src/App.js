import { Fragment } from 'react';
import { useSelector } from 'react-redux';

import Counter from './components/Counter';
import Auth from './components/Auth';
import Header from './components/Header';
import UserProfile from './components/UserProfile';



function App() {
  const isAuth = useSelector(state => state.auth.isAuthenticated);

  return (
    <Fragment>
      <Header />
      {/* 로그인 상태가 아니라면 Auth */}
      {!isAuth && <Auth />}
      {/* 로그인 상태라면 UserProfile */}
      {isAuth && <UserProfile />}
      <Counter />
    </Fragment>
    
  );
}

export default App;
