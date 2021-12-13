import { createContext, useState } from "react";

const FavoritesContext = createContext({
    favorites : [],
    totalFavorites : 0,
    // context에 함수를 포함하기 위해, 빈 함수를 포함한다.
    addFavorite : (favoriteMeetup) => {},
    removeFavorite : (meetupId) => {},
    itemIsFavorite : (meetupId) => {},
});

// 즐겨찾기 추가, 제거 등의 변화 등 작업을 통해 값을 업데이트 하는 역할도 함.
// 컨텍스트를 제공하는 역할을 하는 컴포넌트가 될 것.
export function FavoritesContextProvider(props){
    const [userFavroites, setUserFavroites] = useState([]);

    function addFavoriteHandler (favoriteMeetup){
        // setUserFavroites(userFavroites.concat(favoriteMeetup))
        // -> 마지막 상태 업데이트가 처리되지 않아, 최신 상태를 반영하지 않는 문제가 있음 Q
        setUserFavroites((prevUserFavorites)=>{
            return prevUserFavorites.concat(favoriteMeetup);
        });
    }
    function removeFavoriteHandler (meetupId){
        setUserFavroites((prevUserFavorites)=>{
            return prevUserFavorites.filter((meetup)=> meetup.id !== meetupId);
        });
    }
    function itemIsFavoriteHandler (meetupId){
        // 내장 탐색 메서드 some
        return userFavroites.some((meetup)=> meetupId === meetup.id); // 일치하는 id 있는 경우 true
    }

    // 최신 값을 가지고 있는 context 객체 
    const context = {
        favorites : userFavroites,
        totalFavorites : userFavroites.length,
        addFavorite : addFavoriteHandler,
        removeFavorite : removeFavoriteHandler,
        itemIsFavorite : itemIsFavoriteHandler,
    };
    
    return <FavoritesContext.Provider value = {context}> {/* .Provider은 내장 컴포넌트.  context를 value로 전달 */}
        {props.children}
    </FavoritesContext.Provider>
}

export default FavoritesContext;

