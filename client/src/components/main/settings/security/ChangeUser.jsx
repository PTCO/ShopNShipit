import { useContext, useEffect } from "react";
import BackBtn from "../../../universal/BackBtn";
import UserContext from "../../../../context/userContext";
import Form from "../../../universal/Form";

const ChangeUser = () => {
    const { actions } = useContext(UserContext);

    useEffect(()=>{
        actions.setErrorMsg({messages: [], type: ""})
    }, [])

    return (
        <>
        <div className="mt-2">
            <Form 
                inputs={[
                    {type: "text", name: "oldUsername", id: "oldUsername", label: "Old Username"},
                    {type: "text", name: "newUsername", id: "newUsername", label: "New Username"},
                ]}
                legend={"Change Username"}
                buttons={[
                    {type: "submit", text: "Change"}
                ]}
                method={actions.usrnChange}
            />
        </div>
        <div className="mt-3 border-top border-2 pt-2">
            <BackBtn text={"Security"} path={"/Home/Settings/Security"}/>
        </div>
        </>
    )
}

export default ChangeUser;