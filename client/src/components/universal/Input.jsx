import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Input = ({input, formType}) => {
    const location = useLocation();
    const [ CardType, setCardType ] = useState("");
    const [strength, setStrength ] = useState([]);
    const [states, setStates ] = useState(['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming']);

    const pwdStrengthChecker = (val) => {
        let counter = [1];
        if(/^\S{8,16}/gm.test(val)) {
            if(/[A-Z]/gm.test(val)) counter.push(1);
            if(/[a-z]/gm.test(val)) counter.push(1);
            if(/[1-9]/gm.test(val)) counter.push(1);
            if(/[$&+,:;=?@#|'<>.^*()%!-]/gm.test(val)) counter.push(1);
            // counter.push(1);
        }
        setStrength(counter)
    }

    const [data, setData ] = useState("");;

    useEffect(()=> {
        if(input.type === "text") {
            return
        }
        if(data.charAt(0) === "4") setCardType('visa')
        if(data.charAt(0) === "3") setCardType('amex')
        if(data.charAt(0) === "5") setCardType('mastercard')
        if(data.charAt(0) === "6") setCardType('discover')
    }, [data])

    return (
        <>
            <span className={`d-flex flex-column ${formType === "payment" && input.type !== 'text'? 'w-50':'w-100'} ${CardType !== "" ? null:'mb-auto'}`}>
                <label key={input.label} htmlFor={input.id} className={`${input.type === "number" || input.name === "cardholder" || input.name === "expiration" ? "ms-2 me-auto ":null} mt-1`}>{input.label}</label>
                {input.type !== 'textarea' && input.name !== "state" ? 
                <input 
                    className={`${input.name === "cvv" || input.name === "zip" ? "w-50 ms-2 me-auto":null} ${input.name === "cardnumber" ? "w-100 px-1 me-auto":null} ${input.name === "expiration" ? "w-25":null} form-control`}
                    value={data}
                    type={input.type !== "number" ? input.type:"text"} name={input.name} 
                    id={input.id} 
                    onChange={e =>{ 
                        if(input.name === 'expiration') {
                            if(e.target.value.length <= input.limit || e.target.value === '')  setData(e.target.value);
                            return                            
                        }
                        if(input.name === 'cvv' || input.name === 'cardnumber' || input.name === 'zip') {
                            if(CardType === "amex" ) {
                                if(/^[0-9\b]+/.test(e.target.value) && e.target.value.length <= 15 || e.target.value === '') setData(e.target.value);
                            } else {
                                if(/^[0-9\b]+/.test(e.target.value) && e.target.value.length <= input.limit || e.target.value === '') setData(e.target.value);
                            }
                            return
                        }
                        if(input.type === "number"){
                            if(/^[0-9\b]$/.test(e.target.value) && e.target.value <= 5 || e.target.value === '') setData(e.target.value);
                            return
                        } 
                        if(input.type === 'address') {
                            if(!/[$+,:;\[\]=?|{}<>^*()!]/gm.test(e.target.value)) {
                                setData(e.target.value)
                            }
                            return 
                        }
                        else pwdStrengthChecker(e.target.value); setData(e.target.value)
                    }}
                    
                />
                :
                <textarea value={data} name={input.type} id={input.id} className={`${input.name === "state" ? 'd-none':null} form-control`} onChange={ e => {setData(e.target.value)}} ></textarea>
                }
                {input.name === "state" ?
                <>
                <div>
                    <select className="form-control" name={input.name} id={input.id} value={data} onChange={ e => setData(e.target.value)}>
                        <option selected disabled>Please choose state</option>
                        {states.map( state => {
                            return <option value={state} >{state}</option>
                        })}
                    </select>
                </div>
                </>
                :
                null
                }
                {CardType && input.name === 'cardnumber' ? 
                <>
                <i class={`ms-1 fa-brands fa-2x me-auto mt-1 fa-cc-${CardType}`}></i>
                <input type="text" name="type" id="type" value={CardType} className="d-none"/>
                </>
                :
                null
                }
            </span>
            <div className={`${input.name === 'Password' && input.id !== 'oldPassword' && data && (location.pathname === '/Signup' || location.pathname === '/Home/Settings/Security/Password') ? null:'d-none'} text-start mt-1 mb-1 pb-0 w-100 pwdStrength`} style={{fontSize: '.7rem'}}>
                <span className="d-flex align-items-center border-bottom border-2 pb-1 mb-2">
                    <h6 className="m-0 me-2 border-end border-2 pe-2">Strength</h6>                                                                 {/* Change color below as needed */}
                    {strength.map((point, index) => {return ( <i key={index} className={`${point !== 1 ? 'fa-regular':'fa-solid'} fa-circle fa-lg mx-1`} style={{color: '#111'}}></i>)})} 
                    <p className="m-0 p-1 ms-2 border border-2 rounded strengthMsg">{strength.length <= 3 ? 'Weak':`${strength.length < 5 ? 'Moderate':'Strong'}`}</p>
                </span>                                   {/* Change background color below as needed */}
                <p><b className="p-1 rounded text-white" style={{backgroundColor: '#a6a6a6'}}>Between 8-16 characters</b></p>
                                                                        {/* Change background color below as needed */}
                <p className=" my-2 "><b className="p-1 rounded text-white" style={{backgroundColor: '#a6a6a6'}}>Use Cap Characters & Numbers</b></p>
                                                            {/* Change background color below as needed */}
                <p><b className="p-1 bg-dark rounded text-white" style={{backgroundColor: '#a6a6a6'}}>$&+,:;=?@#|'.^*%!</b> </p>
            </div>
        </>
    )
};

export default Input;