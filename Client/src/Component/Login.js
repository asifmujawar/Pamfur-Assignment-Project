import axios from 'axios'
import react, { useState } from 'react'
import { useNavigate } from 'react-router'
import '../Styles/Home.css'
import background from './back.png'
import {motion} from 'framer-motion'
function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async () => {
        const user = {
            email: email,
            password: password
        }
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        }).then(res => {
            if (res.status == 503) {
                window.alert("Logged in Successfully")
                navigate('/profile')
            }
            else if (res.status == 501) {
                window.alert("User Not Found")
            }
            else if (res.status == 502) {
                window.alert("Password Incorrect")
            }
            else {
                window.alert("Something Went Wrong");
            }
        }).catch(err => {
            window.alert("Wrong");
        });
    }
    return (

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
                        <h3 style={{marginBottom:'20px'}}>Login To Your Account</h3>
                        <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required={true} /><br/>
                        <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} required={true} /><br />
                        <motion.button whileHover={{ scale: 1.1 }} onClick={handleLogin} className="login-button">Login</motion.button>
                        <p style={{fontWeight:'bold'}}>Don't have an Account ?<a href="/register">Signup</a></p>
                    </motion.div>
                </div>
            </div>
        </div>

    )
}

export default Login