import Form from "../../../universal/Form";
import BackBtn from "../../../universal/BackBtn";
import { useContext, useEffect } from "react";
import UserContext from "../../../../context/userContext";

const ChangePwd = () => {
    const { actions } = useContext(UserContext);

    useEffect(()=>{
        actions.setErrorMsg({messages: [], type: ""})
    }, [])

    return (
        <>
        <div className="mt-2">
            <Form 
                inputs={[
                    {type: "password", name: "oldPassword", id: "oldPassword", label: "Old Password"},
                    {type: "password", name: "Password", id: "Password", label: "New Password"},
                ]}
                legend={"Change Password"}
                buttons={[
                    {type: "submit", text: "Change"}
                ]}
                method={actions.pwdChange}
            />
        </div>
        <div className="mt-3 border-top border-2 pt-2">
            <BackBtn text={"Security"} path={"/Home/Settings/Security"}/>
        </div>
        </>
    )
}

export default ChangePwd;