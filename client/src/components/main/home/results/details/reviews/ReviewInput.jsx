import { useContext, useEffect } from "react";
import Form from ".././../../../../universal/Form";
import SearchContext from "../../../../../../context/searchContext";
import UserContext from "../../../../../../context/userContext";

const ReviewInput = ({}) => {
    const { actions } = useContext(UserContext);
    const { searchActions } = useContext(SearchContext);

    const backToReviews = () => {
        actions.navigate('/Home/Product/Reviews')
    }

    useEffect(()=>{
        actions.setErrorMsg({messages: [], type: ""})
    }, [])

    return (
        <>
        <Form
            inputs={[
                {type: "text", name: "Summary", id: "Summary", label: "Summary"},
                {type: "textarea", name: "Review", id: "Review", label: "Review"},
                {type: "number", name: "Rating", id: "Rating", label: "Rating (1 - 5)"},
            ]}
            buttons={[ {type: "submit", text: "Post", method: ""}, {type: "button", text: "Cancel", color: "#4d5c46", method: backToReviews} ]}
            method={searchActions.createReview}
            legend={"Create New Review"}
        />
        </>
    )

}
export default ReviewInput;