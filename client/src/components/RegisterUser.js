import React ,{useState} from 'react';
// import {motion} from 'framer-motion';
// import { animationOne, transition} from '../animations/Animation';
import axios from 'axios';

const RegisterUser =(props) =>{

const [confirmReg, setConfirmReg] = useState("");
const [errs, setErrs] = useState({});
const [ user, setUser ] = useState({
    companyName: "",
    primaryMarket:"",
    firstName:"",
    lastName:"",
    email: "",
    mobileNumber:"", 
    password: "", 
    confirmPassword: "",
})

const handleChange = (e) => {
    setUser({
    ...user,
    [e.target.name]: e.target.value,
    })
}

const register = e => {
    e.preventDefault();

    axios.post("http://localhost:8000/api/users/register", 
    user,             
    {
        withCredentials: true,
    })
    .then(res => {
    console.log(res.data);

        setUser({
        companyName: "",
        primaryMarket:"",
        firstName:"",
        lastName:"",
        email: "",
        mobileNumber:"", 
        password: "", 
        confirmPassword: "",
        })

        setConfirmReg("Registration complete, please log in to continue!");
        setErrs({});
        // navigate("/");
    })
    .catch((err) => {
        console.log(err);
        setErrs(err.response.data.errors);
    });
};

return (
    <div className="container">
        <nav>
                <img className="d2w-logo"src="D2W.PNG"  alt="d2w-logo"/>
        </nav>  
        <main>
                <div className="box-dashboard">
                        <h1 className="big-text">Register</h1>
                {
                    confirmReg ? 
                    <h4 style={{color: "green"}}>{confirmReg}</h4>
                    : null
                }
                <form onSubmit={register}>
                            <div>
                            <label className="text">Company Name</label>
                            {
                                errs.companyName ? 
                                <span className="error-text">{ errs.companyName.message }</span>
                                : null
                            }
                            <input
                                type="text"
                                name="companyName"
                                value={user.companyName}
                                onChange={(e) => handleChange(e)}
                            />
                            </div>
                            <div>
                            <label className="text">Primary Market</label>
                            {
                                errs.primaryMarket ? 
                                <span className="error-text">{ errs.primaryMarket.message }</span>
                                : null
                            }
                            <input
                                type="text"
                                name="primaryMarket"
                                value={user.primaryMarket}
                                onChange={(e) => handleChange(e)}
                            />
                            </div>
                            <div>
                            <label className="text">First Name</label>
                            {
                                errs.firstName ? 
                                <span className="error-text">{ errs.firstName.message }</span>
                                : null
                            }
                            <input
                                type="text"
                                name="firstName"
                                value={user.firstName}
                                onChange={(e) => handleChange(e)}
                            />
                            </div>
                            <div>
                            <label className="text">Last Name</label>
                            {
                                errs.lastName ? 
                                <span className="error-text">{ errs.lastName.message }</span>
                                : null
                            }
                            <input
                                type="text"
                                name="lastName"
                                value={user.lastName}
                                onChange={(e) => handleChange(e)}
                            />
                            </div>
                            <div>
                            <label className="text">Email</label>
                            {
                                errs.email? 
                                <span className="error-text">{ errs.email.message }</span>
                                : null
                            }
                            <input
                                type="email"
                                name="email"
                                value={user.email}
                                onChange={ handleChange }
                            />
                            </div>
                            <div>
                            <label className="text">Mobile Number</label>
                            {
                                errs.mobileNumber? 
                                <span className="error-text">{ errs.mobileNumber.message }</span>
                                : null
                            }
                            <input
                                type="tel"
                                name="mobileNumber"
                                value={user.mobileNumber}
                                onChange={ handleChange }
                            />
                            </div>
                            <div>
                            <label className="text">Password</label>
                            {
                                errs.password ? 
                                <span className="error-text">{ errs.password.message }</span>
                                : null
                            }
                            <input
                                type="password"
                                name="password"
                                value={user.password}
                                onChange={ handleChange }
                            />
                            </div>
                            <div>
                            <label className="text">Confirm Password</label>
                            {
                                errs.confirmPassword? 
                                <span className="error-text">{ errs.confirmPassword.message }</span>
                                : null
                            }
                            <input
                                type="password"
                                name="confirmPassword"
                                value={user.confirmPassword}
                                onChange={ handleChange }
                            />
                    </div>
                    <div className="center">
                    <button 
                        type="submit"
                    >Register</button>
                    </div>
                </form>
            </div>
        </main>
    </div>
);
}



export default RegisterUser;

