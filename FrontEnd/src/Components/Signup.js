/* eslint-disable react-hooks/exhaustive-deps */
import "../Style/signup.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import swal from "sweetalert";

const Signup = () => {
  let Navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    number: "",
    city: "",
  });

  const [formErrors, setFormErrors] = useState({});

  let names, value;
  const onChange = (e) => {
    // console.log(e);
    names = e.target.name;
    value = e.target.value;

    setUser({ ...user, [names]: value });
  };

  const postData = async (e) => {
    e.preventDefault();
    setFormErrors(validate(user));


    const { name, email, number, city } = user; //obj destructuring

    const res = await fetch("http://localhost:3000/api/signups", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        number,
        city,
      }),
    });

    const data = await res.json();

    if (data && res.status === 200) {
      swal("Done", "Appointment Set", "success");
      Navigate('/create-event')
    }
    else {
      swal("Error", "error setting appointment", "error");

    }

  };



  const validate = (values) => {
    const errors = {};
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    if (!values.name) {
      errors.name = "name is required";
    };

    if (!values.email) {
      errors.email = "email is required";
    };
    if (!regex.test(values.email)) {
      errors.email = "invalid email";
    };
    if (!values.number) {
      errors.number = "number is required";
    }
    if (values.number.length !== 10) {
      errors.number = "invalid number";
    }
    if (!values.city) {
      errors.city = "city is required";
    }
    return errors;
  };

  return (
    <>
      <div className="container">
        <div className="myCard">
          <div className="row">
            <div className="col-md-6">
              <div className="myLeftCtn">
                <form className="myForm text-center" method="POST">
                  <header>Register Patient</header>
                  <div className="form-group">
                    <i className="fas fa-user"></i>
                    <input
                      type="text"
                      className="myInput"
                      placeholder="Enter Your Name"
                      id="name"
                      name="name"
                      value={user.name}
                      onChange={onChange}
                      autoComplete="off"
                      required
                    />
                  </div>
                  <p style={{ color: 'red' }}>{formErrors.name}</p>

                  <div className="form-group">
                    <i className="fas fa-envelope"></i>
                    <input
                      type="email"
                      className="myInput"
                      placeholder="Enter Your Email"
                      id="email"
                      name="email"
                      value={user.email}
                      onChange={onChange}
                      autoComplete="off"
                      required
                    />
                  </div>
                  <p style={{ color: 'red' }}>{formErrors.email}</p>

                  <div className="form-group">
                    <i className="fas fa-user"></i>
                    <input
                      type="number"
                      className="myInput"
                      placeholder="Enter Your Number"
                      id="number"
                      name="number"
                      value={user.number}
                      onChange={onChange}
                      autoComplete="off"
                      required
                    />
                  </div>
                  <p style={{ color: 'red' }} >{formErrors.number}</p>

                  <div className="form-group">
                    <i className="fas fa-city"></i>
                    <input
                      type="text"
                      className="myInput"
                      placeholder="Enter Your City"
                      id="city"
                      name="city"
                      value={user.city}
                      onChange={onChange}
                      autoComplete="off"
                      required
                    />
                  </div>
                  <p style={{ color: 'red' }} >{formErrors.city}</p>

                  <input
                    type="submit"
                    className="butt"
                    value="Register Patient"
                    onClick={postData}
                  />
                </form>
              </div>
            </div>
            <div className="col-md-6">
              <div className="myRightCtn">
                <div className="box">
                  <header>Already Registered?</header>
                  <NavLink to="/create-event">
                    <input
                      type="button"
                      className="butt_out"
                      value="Set Apointment"
                    />
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
