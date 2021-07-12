import React, { useState, useEffect } from "react";
import DayList from "./DayList";
import "components/Application.scss";
import Appointment from "./Appointment";
import axios from "axios";
import { getAppointmentsForDay, getInterview } from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: []
    
  });
  const setDay = day => setState((prev) => ({ ...prev, day }));

  useEffect(() => {
    const daysURL = `http://localhost:8001/api/days`;
    const appointmentsURL = `http://localhost:8001/api/appointments`
    const interviewersURL = `http://localhost:8001/api/interviewers`
    Promise.all([
      axios.get(daysURL),
      axios.get(appointmentsURL),
      axios.get(interviewersURL)
    ])
    .then(response => {
      setState((prev) => ({ ... prev, days: response[0].data, appointments: response[1].data, interviewers: [] }))//response[2].data

    });
  }, [])
  const appointmentDailyList = getAppointmentsForDay(state, state.day)

  const appointmentList = appointmentDailyList.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return <Appointment 
    key={appointment.id}
    id={appointment.id}
    time={appointment.time}
    interview={interview} />;
  });
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />{" "}
      </section>
      <section className="schedule">{appointmentList}<Appointment time={"5pm"}/></section>
    </main>
  );
}
