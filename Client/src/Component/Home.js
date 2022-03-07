import axios from 'axios'
import react from 'react'
import '../Styles/Home.css'
import background from './back.png'
import { BsArrowRight } from "react-icons/bs";
import { motion } from 'framer-motion'
function Home() {
    const obj = {
        "name": "Asif"
    }
    const handleClick = () => {
        axios.get('http://localhost:4000/home')
            .then((res) => {
                window.alert("Request Sent")
            })
    }
    return (
        <motion.div
            className="home-container">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1.5 }}
                className="row"
                style={{borderRadius:'20px'}}
                >
                <div className="col-lg-6 home-left">
                    <motion.div 
                    initial={{x : '-100vw'}}
                    animate={{x : 0}}
                    transition={{type:'spring',stiffness:120,delay:2}}>
                        <h1>Calendar 2022</h1>
                    </motion.div>
                    <img src={background} />
                </div>
                <div
                 className="col-lg-6 home-right">
                    <motion.div 
                    initial={{y:-300}}
                    animate={{y:0}}
                    transition={{delay:2}}
                    className="home-text">
                        <h3>Hi Asif</h3>
                        <p>Welcome to your daily event calendar. Be more engaging and personalized than ever before we'll help you in <span className="home-span">Tracking upcoming events,Schedule Meetings & Creating New Evens</span></p>
                        <motion.button whileHover={{ scale: 1.1 }} className="getstarted"><a href="/login" style={{ color: 'white', textDecoration: 'none' }}>Get Started</a></motion.button>
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default Home