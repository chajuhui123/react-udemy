import NewMeetupForm from "../components/meetups/NewMeetupForm";
import { useHistory } from 'react-router-dom';

function NewMeetupPage(){
    // 브라우저의 기록을 조작하기 위해 호출
    const history = useHistory();

    function onAddMeetupHandler(meetupData){
        fetch(
            // 첫 번째 인자는 URL(다음과 같이 URL을 작성하면 meetups 테이블이 추가되며, 끝이 .json 형태로 끝나야한다.
            'https://react-getting-started-7c50f-default-rtdb.firebaseio.com/meetups.json',
            // 두 번째 인자는 기능을 호출하는 객체를 작성한다. body에는 어떤 데이터가 담길 것인지 작성
            {
                method : "POST",
                body : JSON.stringify(meetupData),
                headers : {
                    'Content-Type' : 'application/json'
                },
            }
        ).then(() => {
            // HTTP 요청이 완료되면 NewForm 페이지는 '/' 와 교체되기에 정보들이 사라짐
            // 사용자로 하여금 작업이 완료된 것을 느끼게 해줄 수 있음
            history.replace('/');
        });
    }

    return <section>  
        <h3>ADD New Meetup</h3>
        <NewMeetupForm onAddMeetup = {onAddMeetupHandler} />
    </section>
}

export default NewMeetupPage;