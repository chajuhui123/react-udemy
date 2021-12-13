import { useRef } from 'react';
import Card from '../ui/Card';
import classes from './NewMeetupForm.module.css'; 

// NewMeetupForm에 있는 데이터를 상위 컴포넌트로 보내는 작업 실시
function NewMeetupForm(props){
    const titleInputRef = useRef();
    const imageInputRef = useRef();
    const addressInputRef = useRef();
    const descriptionInputRef = useRef();

    function submitHandler(event){
        event.preventDefault();

        const enteredTitle = titleInputRef.current.value;
        const enteredIamge = imageInputRef.current.value;
        const enteredAddress = addressInputRef.current.value;
        const enteredDescription = descriptionInputRef.current.value;

        const meetupData = {
            title : enteredTitle,
            image : enteredIamge,
            address : enteredAddress,
            description : enteredDescription,
        }
        // meetupData를 상위 컴포넌트로 보내주기 위한 작업
        props.onAddMeetup(meetupData);
    }
    return <Card>
        <form className = {classes.form} onSubmit = {submitHandler}>
            <div className = {classes.control}>
                {/* htmlFor은 for 대신 사용하는 JSX prop (className과 같은 개념)  */}
                <label htmlFor = "title">Meetup Title</label>
                {/* 유효성 검사를 위해 required */}
                <input type="text" required id="title" ref = {titleInputRef} />
            </div>
            <div className = {classes.control}>
                <label htmlFor = "image">Meetup Image</label>
                <input type="url" required id="image" ref = {imageInputRef} />
            </div>
            <div className = {classes.control}>
                <label htmlFor = "address">Meetup Address</label>
                <input type="text" required id="address" ref = {addressInputRef} />
            </div>
            <div className = {classes.control}>
                <label htmlFor = "description">Meetup Description</label>
                <textarea id = "description" rows = "5" required ref = {descriptionInputRef} />
            </div>
            <div className ={classes.actions}>
                <button >Add Meetup</button>
            </div>
        </form>
    </Card>
}
export default NewMeetupForm;