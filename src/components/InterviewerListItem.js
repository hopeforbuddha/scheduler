import React from 'react';
import classNames from 'classnames';
import 'components/InterviewerListItem.scss';



const InterviewerListItem = function(props) {

  const interviewerItemClass = classNames("interviewers__item", {
    "interviewers__item--selected" : props.selected
  });
  return (
    <li className={interviewerItemClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
};

export default InterviewerListItem;