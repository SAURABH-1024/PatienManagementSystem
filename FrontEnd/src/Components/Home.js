import React from 'react';
import { NavLink } from 'react-router-dom';
import "../Style/Home.css"



const Home = () => {
    return (
        <>

            <header className="masthead">
                <div className="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
                    <div className="col-lg-8 align-self-end">
                        <h1 className="text-white-75 mb-5" id='heading' >PMS TOOL</h1>
                        <p className="text-white-75 mb-2" id='description' >Patient Management Software for Fuelling Better Performance for Clinics, Hospitals & Doctors. Implement end-to-end flows – from admission to discharge..</p>


                    </div>
                    <div className="col-lg-8 align-self-baseline">

                        <NavLink className="btn btn-primary btn-xl" id='app-btn' to="/signups"> Register</NavLink>


                    </div>
                </div>
            </header>







        </>
    )
};

export default Home;
