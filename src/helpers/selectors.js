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
  console.log(filteredDay);

  if (filteredDay.length > 0) {
    const filteredInterviewers = filteredDay[0].interviewers.map((obj) => {
      console.log("id---", obj);
      return state.interviewers[obj];
    });
    return filteredInterviewers;
  } else {
    return [];
  }
}
