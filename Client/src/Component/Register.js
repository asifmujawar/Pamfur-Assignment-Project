import react, { useState } from 'react'
import { useHistory, useNavigate } from 'react-router'
import '../Styles/Home.css'
import background from './back.png'
import {motion} from 'framer-motion'
function Register(){
    const navigate = useNavigate();
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const handleSignup = ()=>{
        const user = {
            name:name,
            email:email,
            password:password
        }
        fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        }).then(res => {
            if (res.status == 200) {
                window.alert("Registration Successfull")
                navigate('/login')
            }
            else if (res.status == 401) {
                window.alert("Registration Failed")
            }
            else if(res.status == 400){
                window.alert("User Already Exist")
            }
            else {
                window.alert("Something Went Wrong");

            }
        }).catch(err => {
            window.alert("Wrong");
        });
    }
    return(

        <div className="home-container">
            <div className="row">
                <div className="col-lg-6 home-left">
                    <div>
                        <h1>Calendar 2022</h1>
                    </div>
                    <img src={background} />
                </div>
                <div className="col-lg-6 home-right">
                    <motion.div
                    initial={{x : '-100vw'}}
                    animate={{x : 0}}
                    transition={{type:'spring',stiffness:120}}
                     className="home-text">
                        <h3 style={{marginBottom:'20px'}}>Register Your Account</h3>
                        <input type="text" placeholder="Your Name" onChange={(e)=>setName(e.target.value)}/>
                        <input type="text" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
                        <input type="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)}/><br/>
                        <motion.button whileHover={{ scale: 1.1 }} onClick={handleSignup} className="login-button">Signup</motion.button>
                        <p style={{fontWeight:'bold'}}>Already have an Account ?<a href="/login">Login</a></p>
                    </motion.div>
                </div>
            </div>
        </div>

        // <div className="container">
        //     <div className="box">
        //         <div className="content">
        //             <h1>Register New Account</h1>
        //             <input type="text" placeholder="Your Name" onChange={(e)=>setName(e.target.value)}/>
        //             <input type="text" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
        //             <input type="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)}/><br/>
        //             <button onClick={handleSignup}>Signup</button>
        //             <p>Already have an Account ?<a href="/">Login</a></p>
        //         </div>
        //     </div>
        // </div>
    )
}

export default Register