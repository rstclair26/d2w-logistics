import React ,{useState} from 'react';
import {motion} from 'framer-motion';
import { animationOne, transition} from '../animations/Animation';
import { Link , navigate} from '@reach/router';
import axios from 'axios';

const RegisterUser =(props) =>{

const [confirmReg, setConfirmReg] = useState("");
const [errs, setErrs] = useState({});
const [ user, setUser ] = useState({
    companyName: "",
    goodsType:"",
    firstName:"",
    lastName:"",
    email: "",
    mobilePhone:"", 
    password: "", 
    confirmPassword: "",
})
const primaryMarketArr = ["Automotive","Clothing Retail","Electronics","Food Production","Industrial"];
const handleChange = (e) => {
    setUser({
    ...user,
    [e.target.name]: e.target.value,
    })
}

const register = (e)=> {
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
        goodsType:"",
        firstName:"",
        lastName:"",
        email: "",
        mobilePhone:"", 
        password: "", 
        confirmPassword: "",
        })

        setConfirmReg("Registration complete, please log in to continue!");
        setErrs({});
        navigate("/capacities");
    })
    .catch((err) => {
        console.log(err);
        setErrs(err.response.data.errors);
    });
};

return (
    <div className="container">
        <motion.div initial="out" animate="in" exit="out" variants={animationOne} transition={transition}>
        <header className="header">
            <img className="d2w-logo"src="D2W.PNG"  alt="d2w-logo" width="200"  height="200"/>
        </header>  
        <main>
            <div className="blob"> <img src="/images/business.png" alt="blob" width="600" height="600"/> 
            <h1 className="main-text">Welcome to D2W Logistics</h1>
            </div>
                <div className="box-dashboard">
                <img src="/images/signup.png" alt="ship-logo" width="75" height="75"/>  
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
                            <input type="text" name="companyName" value={user.companyName} onChange={(e) => handleChange(e)}/>
                            </div>
                            <div>
                            <label className="text">Primary Market</label>
                            {
                                errs.goodsType ? 
                                <span className="error-text">{ errs.goodsType.message }</span>
                                : null
                            }
                            <select  name="goodsType" value={ user.goodsType } onChange={(e) => handleChange(e)}>
                                                <option value=""></option>
                                                {
                                                    primaryMarketArr.map((market) =>(
                                                        <option value={market} key={market}>{market}</option>
                                                    ))
                                                }                               
                        </select>  
                            </div>
                            <div>
                            <label className="text">First Name</label>
                            {
                                errs.firstName ? 
                                <span className="error-text">{ errs.firstName.message }</span>
                                : null
                            }
                            <input type="text"name="firstName" value={user.firstName} onChange={(e) => handleChange(e)} />
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
                                onChange={ (e) => handleChange(e)}
                            />
                            </div>
                            <div>
                            <label className="text">Mobile Number</label>
                            {
                                errs.mobilePhone? 
                                <span className="error-text">{ errs.mobilePhone.message }</span>
                                : null
                            }
                           <input
                                type="text"
                                name="mobilePhone"
                                value={user.mobilePhone}
                                onChange={(e) => handleChange(e)}
                            />
                            </div>
                            <div>
                            <label className="text">Password</label>
                            {
                                errs.password ? 
                                <span className="error-text">{ errs.password.message }</span>
                                : null
                            }
                            <input  type="password" name="password" value={user.password} onChange={ (e) => handleChange(e)} />
                            </div>
                            <div>
                            <label className="text">Confirm Password</label>
                            {
                                errs.confirmPassword? 
                                <span className="error-text">{ errs.confirmPassword.message }</span>
                                : null
                            }
                            <input type="password" name="confirmPassword"  value={user.confirmPassword}  onChange={ (e) => handleChange(e) }
                            />
                    </div>
                    <div className="center">
                    <button   type="submit" >Register</button>
                        </div>
                </form>
            </div>
            
        </main>
        </motion.div>
    </div>
);
}



export default RegisterUser;

