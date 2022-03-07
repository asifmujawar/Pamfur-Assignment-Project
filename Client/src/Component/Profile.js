import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../Styles/Profile.css'
import background from './back.png'
import { Button, Modal } from 'react-bootstrap'
import { motion} from 'framer-motion'
const locales = {
    "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const events = [
    {
        title: "Meeting",
        start: new Date(2022, 2, 15),
        end: new Date(2022, 2, 18),
    },
    {
        title: "Assignment",
        start: new Date(2022, 2, 15),
        end: new Date(2022, 2, 15),
    },
    {
        title: "Interview",
        start: new Date(2022, 2, 20),
        end: new Date(2022, 2, 23),
    },
    {
        title: "Conference",
        start: new Date(2022, 2, 4),
        end: new Date(2022, 2, 5),
    },
];

function Profile() {
    const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
    const [allEvents, setAllEvents] = useState(events);
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false)
    };
    const handleShow = () => setShow(true);

    function handleAddEvent() {
        setAllEvents([...allEvents, newEvent]);
        setShow(false)
    }

    return (

        <div className="calendar-container">
            <div className="calendar-row row">
                <div className="col-lg-6 calendar-left">
                    <Calendar localizer={localizer} events={allEvents} startAccessor="start" endAccessor="end"
                        eventPropGetter={(event, start, end, isSelected) => ({
                            event,
                            start,
                            end,
                            isSelected,
                            style: { backgroundColor: "lightblue",color:'black'}
                        })}
                        style={{ height: '350px', color: 'white', marginTop: '10px', marginBottom: '10px' }} />
                </div>
                <motion.div
                initial={{y:-250}}
                animate={{y:0}}
                 className="col-lg-6 calendar-right">
                    <h4 style={{ marginBottom: '10px', color: 'black', fontWeight: 'bold' }}>Upcoming Events</h4>
                    <div className="event-div">
                        {
                            allEvents.map(({ title, start, end }) => {
                                return (
                                    <div className="event-detail">
                                        <p className="event-heading">{title}</p>
                                        <p className="event-start">Start : {start.toDateString()}</p>
                                        <p className="event-head">End   :  {end.toDateString()}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>

                        <button onClick={handleShow}>Add Event</button>
                    </div>
                    <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
                        <Modal.Header closeButton>
                            <Modal.Title style={{ color: 'blue', fontWeight: 'bold' }}>Add Events</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="setEvent-div">
                                <form>
                                    <input type="text" placeholder="Add Title" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
                                    <DatePicker placeholderText="Start Date" style={{ marginRight: "10px" }} selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })} />
                                    <DatePicker placeholderText="End Date" selected={newEvent.end} onChange={(end) => setNewEvent({ ...newEvent, end })} />
                                </form>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>Close</Button>
                            <Button variant="primary" style={{ backgroundColor: 'rgb(36, 83, 238)' }} onClick={handleAddEvent}>Add Event</Button>
                        </Modal.Footer>
                    </Modal>
                </motion.div>
            </div>
        </div>
    );
}

export default Profile