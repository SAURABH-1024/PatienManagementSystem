import React, { useState } from 'react'
import Modal from 'react-modal';
import DateTime from 'react-datetime';
import "../Style/Modal.css"
import swal from 'sweetalert'

const AddEventModal = ({ isOpen, onClose, onEventAdded }) => {

    const [details, setDetails] = useState({
        title: "",
        description: "",
        age: "",
        treatment: "",
        illness: "",

    });

    const [start, setStart] = useState(new Date().toLocaleString());
    const [end, setEnd] = useState(new Date().toLocaleString());
    const [formErrors, setFormErrors] = useState({});

    let names, value
    const onChange = (e) => {
        names = e.target.name;
        value = e.target.value;

        setDetails({ ...details, [names]: value });
    }


    const onSubmit = async (e) => {
        e.preventDefault()
        setFormErrors(validate(details));
        try {
            const { title, description, age, treatment, illness } = details;


            const res = await fetch('http://localhost:3000/api/appointments', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title, description, age, treatment, illness, start, end,
                })
            });
            const data = await res.json();
            if (data && res.status === 200) {
                onEventAdded(data);
                swal("Done", "Appointment Set", "success");
                onClose()
            } else {
                swal("Error", "appointment not set", "error");
            }
        } catch (error) {
            console.log("an error occured");
        }

    }
    const validate = (values) => {
        const errors = {};

        if (!values.title) {
            errors.title = "name is required";
        };

        if (!values.illness) {
            errors.illness = "input is required";
        };

        if (!values.age) {
            errors.age = "age is required";
        }
        if (values.description.length > 10) {
            errors.description = "description must atleast be 10 characters";
        }
        if (!values.treatment) {
            errors.treatment = " Describe current treatment";
        }
        return errors;
    };



    return (
        <>
            <Modal isOpen={isOpen} onRequestClose={onClose}>
                <form onSubmit={onSubmit}>
                    <div>
                        <input type="text" className="form-control" placeholder="Name" name="title" defaultValue={details.title} onChange={onChange} />
                    </div>
                    <p style={{ color: 'red' }}>{formErrors.title}</p>


                    <div>
                        <input type="text" className="form-control" placeholder="Description" name="description" defaultValue={details.description} onChange={onChange} />
                    </div>
                    <p style={{ color: 'red' }}>{formErrors.description}</p>


                    <div>
                        <input type="number" className="form-control" placeholder="Age" name="age" defaultValue={details.age} onChange={onChange} />
                    </div>
                    <p style={{ color: 'red' }}>{formErrors.age}</p>


                    <div>
                        <input type="text" className="form-control" placeholder="Describe illness" name="illness" defaultValue={details.illness} onChange={onChange} />
                    </div>
                    <p style={{ color: 'red' }}>{formErrors.illness}</p>


                    <div>
                        <input type="text" className="form-control" placeholder=" Current treatment provided" name="treatment" defaultValue={details.treatment} onChange={onChange} />
                    </div>
                    <p style={{ color: 'red' }}>{formErrors.treatment}</p>


                    <br /><br />
                    <div>
                        <label>Start Date</label>
                        <DateTime value={start} onChange={date => setStart(date)} />
                    </div>

                    <div>
                        <label>End Date</label>
                        <DateTime value={end} onChange={date => setEnd(date)} />
                    </div>
                    <br />
                    <button type="submit" className="set-app">Set Appointment</button>
                </form>

            </Modal>

        </>
    )
}

export default AddEventModal



// http://localhost:8080/api/calendar/create-event
// /api/calendar/create-event