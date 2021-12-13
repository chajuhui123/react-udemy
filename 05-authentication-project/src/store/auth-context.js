import React, {useState, useEffect, useCallback} from "react";
let logoutTimer;

const AuthContext = React.createContext({
    token : "",
    isLoggedIn : false, // 로그인 상태인지
    login : (token) => {},
    logout : () => {},
});

const calculateRemainingTime = (expirationTime) => {
    const currentTime = new Date().getTime(); // 현재 타임스탬프가 찍히고, getTime에 의해 밀리초 단위로 변환된다.
    const adjExpirationTime = new Date(expirationTime).getTime();
    const remainingDuration = adjExpirationTime - currentTime;
    return remainingDuration;
};

const retrieveStoredToken = () => {
    const storedToken = localStorage.getItem("token");
    const storedExpirationDate = localStorage.getItem("expirationTime");
    const remainingTime = calculateRemainingTime(storedExpirationDate); // 남은 시간 계산
    if (remainingTime <= 60000){ // 남은 시간이 1분 이하이면 로그인할 필요가 없음
        localStorage.removeItem("token");
        localStorage.removeItem("expirationTime");
        return null; // 초기화
    }
    return {
        token : storedToken,
        duration : remainingTime,
    }; // 유효한 경우에는 Token 반환
}


export const AuthContextProvider = (props) => {
    const tokenData = retrieveStoredToken();
    // const initialToken = localStorage.getItem("token"); 
    let initialToken;
    if(tokenData){ // null이 아닌 경우
        initialToken = tokenData.token;
    }
    const [token, setToken] = useState(initialToken);
    const userIsLoggedIn = !!token; // 비어있다면 false, 비지 않았다면 true
    
    // 로그아웃 핸들러가 상위에 위치
    const logoutHandler = useCallback(() => {
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
        if(logoutTimer){
            clearTimeout(logoutTimer)
        }
    }, []);
    
    
    const loginHandler = (token, expirationTime) => {
        setToken(token);
        localStorage.setItem('token', token);
        localStorage.setItem('expirationTime', expirationTime);
        const remainingTime = calculateRemainingTime(expirationTime);
        logoutTimer = setTimeout(logoutHandler, remainingTime);
    };
    
    // 사용자가 자동으로 로그인한 경우, tokenData에 있는 duration으로 남은 시간 설정.
    useEffect(()=>{
        if (tokenData){
            console.log(tokenData.duration);
            logoutTimer = setTimeout(logoutHandler, tokenData.duration);
        }
    }, [tokenData, logoutHandler]);

    const contextValue = {
        token : token,
        isLoggedIn : userIsLoggedIn,
        login : loginHandler,
        logout :logoutHandler,
    }
    return <AuthContext.Provider value = {contextValue}> {props.children} </AuthContext.Provider>;
};

export default AuthContext;