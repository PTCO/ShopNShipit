import { useState  ,useEffect, useContext} from "react";
import UserContext from "../../../../context/userContext";

const Rating = ({handleFilter}) => {
    const { user } = useContext(UserContext);

    const [ toggleRating , setToggleRating ] = useState(user.Filter.RatingStatus);
    const [ tags, setTags ] = useState([1, 2, 3, 4, 5])
    const [rating, setRating ] = useState(user.Filter.Rating);

    useEffect(()=>{
        handleFilter({low:null, high:null }, rating, toggleRating)
    }, [toggleRating, rating])

    return (
        <li className="d-flex flex-column mt-2 filterRating">
            <h4 onClick={  e => setToggleRating(pre => !pre)} className="border-bottom border-2 pb-1"><i class={`${!toggleRating ? "fa-regular":"fa-solid"} fa-circle`} style={{color: toggleRating ? "#4d5c46":null}}></i> Rating</h4>
            <span className={`${toggleRating ? "d-flex":"d-none"} align-items-center mt-2 `}>
                {tags.map( tag => { return ( <i key={tag} className={`fa-solid fa-tag fa-2x mx-1 ${rating === tag ? "rating":null}`} onClick={ e => setRating(tag)} ></i> )})}
            </span>
        </li>
    )
}

export default Rating;