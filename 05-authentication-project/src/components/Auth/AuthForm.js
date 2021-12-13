import { useState, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../store/auth-context';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const history = useHistory();
  const [isLogin, setIsLogin] = useState(true);
  // 요청이 보내지는 동안 '로딩 스피너'를 보여주기 위한 state
  const [isLoading, setIsLoading] = useState(false);
  // input 되어있는 값들을 가져오기 위해 useRef
  // input 값에 input prop 으로 연결해줌
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  // 컨텍스트 사용
  const authCtx = useContext(AuthContext);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  // 사용자가 로그인을 요청할 때 확인하는 핸들러
  const sumbmitHandler = (event) => {
    event.preventDefault();

    const enteredEmail =  emailInputRef.current.value;
    const enteredPassword =  passwordInputRef.current.value;

    // 추가 : 유효성 검사

    setIsLoading(true); //로딩상태 시작
    let url;
    
    if (isLogin){ // 로그인 모드
      url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDggypbFJwiOUBtJOsVMj8Qq2cM7yJQNBs"
    } else { // 회원가입 모드
      url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDggypbFJwiOUBtJOsVMj8Qq2cM7yJQNBs"
    }

    fetch(
      url, { // 요청을 구성하는 객체를 전달
        method : "POST",
        // JSON 데이터로 변환
        body : JSON.stringify({
          email : enteredEmail,
          password : enteredPassword,
          returnSecureToken : true,
        }),
        headers : {
          "Content-type" : "application/json"
        },
      }
    ).then(res => {
      // 응답이 받아와지면 false 로
      setIsLoading(false);
      if (res.ok){ // 성공
        return res.json()
      } else { // 실패
        return res.json().then(data => {
          let errorMessage = "Authentication Failed!"
          // if (data && data.error && data.error.message){
          //   errorMessage = data.error.message; // 구체적인 에러 메시지
          // }
          throw new Error(errorMessage); // 오류를 throw
        })
      }
    })
    // 성공 사례를 가져오는 
    .then(data => {
      const expirationTime = new Date(
        new Date().getTime() + (+data.expiresIn * 1000)
      );
      authCtx.login(data.idToken, expirationTime.toISOString());
      history.replace('/');
    })
    // 혹은 오류를 잡아내는 블록을 추가
    .catch(err => { 
      alert(err.message);
    });
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit = {sumbmitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordInputRef} />
        </div>
        <div className={classes.actions}>
          {isLoading && <p>Loading ...</p>}
          {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
