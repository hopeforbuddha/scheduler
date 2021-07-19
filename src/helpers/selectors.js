export function getAppointmentsForDay(state, days) {
  const filteredDay = state.days.filter((tempArr) => {
    return tempArr.name === days;
  });
  if (filteredDay.length > 0) {
    const dayAppsArr = filteredDay[0].appointments;
    let appointmentsArr = [];
    for (let apps of dayAppsArr) {
      appointmentsArr.push(state.appointments[apps]);
    }
    return appointmentsArr;
  } else {
    return [];
  }
}

export function getInterview(state, interview) {
  if (interview) {
    return {
      student: interview.student,
      interviewer: { ...state.interviewers[interview.interviewer] },
    };
  } else {
    return null;
  }
}

export function getInterviewersForDay(state, days) {
  const filteredDay = state.days.filter((tempArr) => {
    return tempArr.name === days;
  });

  if (filteredDay.length > 0) {
    const filteredInterviewers = filteredDay[0].interviewers.map((obj) => {
      return state.interviewers[obj];
    });
    return filteredInterviewers;
  } else {
    return [];
  }
}

export function updateSpots(state, appointments) {
  const currentDay = state.days.find((day) => {
    return day.name === state.day
  })

  const nullAppointments = currentDay.appointments.filter((id) => {
    return appointments[id].interview === null
  })

  const spots = nullAppointments.length
  
  for (let i = 0; i < state.days.length; i++) {
    if (state.days[i].name === state.day) {
        state.days[i].spots = spots
        return state;
    }
  }
}
