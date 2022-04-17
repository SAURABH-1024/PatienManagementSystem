import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import moment from 'moment'
import axios from 'axios'
import AddEventModal from './AddEventModal'
import '../Style/calendar.css'

const Calender = () => {

    const [modalOpen, setModalOpen] = useState(false);
    const [events, setEvents] = useState([])
    const calendarRef = useRef(null)

    const navigate = useNavigate()

    const onEventAdded = (event) => {
        let calendarApi = calendarRef.current.getApi();
        calendarApi.addEvent({
            start: moment(event.start).toDate(),
            end: moment(event.end).toDate(),
            title: event.title,

        });
    }



    // async function handleEventAdd(data) {
    //     await axios.post("/api/calendar/create-event", data.event)
    // }

   


    async function handleDatesSet(data) {
        const response = await axios.get(`/api/appointments?start=${moment(data.start).toLocaleString()}&end=${moment(data.end).toLocaleString()}&title=${data.title}`
        )
        setEvents(response.data)
    }
    return (
        <section>
            <div className="calendar-btns">
                <button onClick={() => setModalOpen(true)} className="add-event"> Set Appointment</button>
                <button className="details" onClick={()=>{ navigate('/appointments')}} >All appointment details</button>
                </div>
            
            <div style={{ position: 'relative', zIndex: 0 }} >

                <FullCalendar
                    events={events}
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    ref={calendarRef}
                    // eventAdd={e => handleEventAdd(e)}
                    datesSet={(date) => { handleDatesSet(date) }}
                />
            </div>

            <AddEventModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onEventAdded={event => onEventAdded(event)} />
        </section>
    )
}

export default Calender