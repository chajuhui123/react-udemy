import { useState, useEffect } from 'react';
import MeetupList from "../components/meetups/MeetupList";

// 라우터로 로딩할 페이지이기에 다음과 같이 -Page 로 명칭
function AllMeetupsPage(){
  const [isLoading, setIsLoading] = useState(true);
  const [loadedMeetups, setLoadedMeetups] = useState([]);
  useEffect(()=>{
    setIsLoading(true);
    // fetch의 두 번째 인자 기본값이 GET 이기 때문에, 작성할 필요 없음.
    fetch('https://react-getting-started-7c50f-default-rtdb.firebaseio.com/meetups.json'
    ).then(response => {
      // 응답에 대한 반환값을 얻고자 할 때 'json' 메소드로 해결할 수 있음.
      return response.json(); // promise ... 어쩌고 하던데... promise를 해결해야 한다
    }).then(data => {
      const meetups = [];
      for (const key in data){
        const meetup = {
          id : key,
          ...data[key] // 데이터 키  배포
        }
        meetups.push(meetup);
      }
      // 실제 데이터를 얻기 위한 과정. 데이터를 불러오는 작업이 완료될 때까지 기다려줘야 한다.
      // 유효한 React 컴포넌트는 동기식이어야 하기 때문에 sync await (비동기) 문을 붙이면 안됨. -> 따라서 값이 반환될 때까지 기다릴 수 없음
      // 따라서 임시 JSX 코드 (EX. 로딩 스피너) 가 필요. 그 후 값이 받아지면 JSX 코드 업데이트 -> state 활용하여 처리할 수 있으ㅁ.
      // 데이터가 있는 상황에서는
      setIsLoading(false);
      setLoadedMeetups(meetups);
    })
  }
  , []);

  

  if(isLoading){
    return <section> <p>로딩 중...</p> </section>    
  }

  return <div>
    <h1>All meetups</h1>
    {/* meetup이라는 props 를 보내주어야한다. MeetupList에서 아래와 같은 이름으로 사용하고 있기 때문 */}
    <MeetupList meetups = {loadedMeetups} />
  </div>
}

export default AllMeetupsPage;