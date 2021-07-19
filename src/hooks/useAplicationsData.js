import { useState, useEffect } from "react";
import axios from "axios";
import { updateSpots } from "helpers/selectors";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
    
  });

  useEffect(() => {
    const daysURL = `/api/days`;
    const appointmentsURL = `/api/appointments`
    const interviewersURL = `/api/interviewers`
    Promise.all([
      axios.get(daysURL),
      axios.get(appointmentsURL),
      axios.get(interviewersURL)
    ])
    .then(response => {
      setState((prev) => ({ ... prev, days: response[0].data, appointments: response[1].data, interviewers: response[2].data }))

    });
  }, [])
  


  const setDay = day => setState((prev) => ({ ...prev, day }));

  function bookInterview(id, interview) {
    console.log(id, interview);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };   
    const appointments = {
      ...state.appointments,
      [id]: appointment
      };

    
    
      return axios.put(`/api/appointments/${id}`, {interview})
      .then((res) => {
        updateSpots(state, appointments)
        setState({
        ...state,
        appointments
        });
      })
    }

    function cancelInterview(id, interview) {
      const appointment = {
        ...state.appointments[id],
        interview: null
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      }
      return axios.delete(`/api/appointments/${id}`, {interview})
      .then((res) => {
        updateSpots(state, appointments)
        setState({
          ...state,
          appointments
        });
        

      })
    }

  return {state, setDay, bookInterview, cancelInterview}
}