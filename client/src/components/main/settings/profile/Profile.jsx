import { useContext, useEffect, useState } from "react";
import BackBtn from "../../../universal/BackBtn";
import UserContext from "../../../../context/userContext";

const Profile = () => {
    const { user , errorMsg, actions } = useContext(UserContext);
    const [ portraitData, setPortraitData ] = useState();
    const [ portrait, setPortrait ] = useState(user.Portrait);

    const base64 = async  (obj) => {
        console.log(obj.files[0].size)
        actions.setErrorMsg({messages: [], type:""});
        if(obj.files[0] === undefined) return
        if(obj.files[0].size > 10485760) {
            setPortraitData("");
            setPortrait(user.Portrait)
            return actions.setErrorMsg({messages: ["File size to large"], type: ""})
        }
        let reader = new FileReader();
        reader.readAsDataURL(obj.files[0]);
        reader.onload = () => {
            setPortrait(reader.result)
            actions.portraitChange(reader.result);
        }
    } 

    useEffect(()=>{
        actions.setErrorMsg({messages: [], type: ""})
        if(portraitData){
            base64(portraitData)
        }
    }, [portraitData])

    return (
    <>
        <h2 className="border-bottom border-2 pb-1 mt-2 mb-2 settingsTitle" >Profile</h2>
        <label for="portrait" className="border border-2 p-2 my-2 rounded w-100" >
            <img src={portrait} alt="" className="changePortraitImage rounded-circle"/>
            <b className="fs-5 ms-2 text-black">Change User Portrait</b>
            <input type="file" className="d-none" id="portrait" onChange={ e => setPortraitData(e.target)}/>
        </label>
        {errorMsg && errorMsg.messages ? 
        errorMsg.messages.map( (error, index) => <p key={index} className={`d-flex ${errorMsg.type === "payment" ? "mx-auto":null} align-items-center fs-6 mt-2 fw-bold mx-auto`}>{error} <i className={`fa-solid ${errorMsg.type === "success" ? "fa-circle-check text-success":"fa-circle-exclamation text-danger"} fa-beat fa-lg ms-1 `}></i></p>)
        :
        null}
        <div className="mt-3 border-top border-2 pt-2">
            <BackBtn text={"Settings"} path={"/Home/Settings"}/>
        </div>
    </>
    )
}

export default Profile;