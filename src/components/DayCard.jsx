import React from 'react';
import PropTypes from 'prop-types';
import {
  getDayCardClasses,
  getCalendarDateClasses,
  getApproavalStateClasses,
} from '../helpers';

const DayCard = ({
  shortDayName,
  calendarDate,
  hoursWorked,
  isWeekend,
  isDaySelected,
  isCurrentDay,
  approvalState,
}) => {
  return (
    <div className={getDayCardClasses(isWeekend)}>
      <div className='day'>{shortDayName}</div>
      <div className={getCalendarDateClasses(isCurrentDay, isDaySelected)}>
        {calendarDate}
      </div>
      <div className='hours-worked'>{hoursWorked || '-'}</div>
      {hoursWorked && (
        <div className={getApproavalStateClasses(approvalState)}>
          {'\u25CF'}
        </div>
      )}
    </div>
  );
};

DayCard.propTypes = {
  shortDayName: PropTypes.string,
  calendarDate: PropTypes.number,
  hoursWorked: PropTypes.string,
  isWeekend: PropTypes.bool,
  isDaySelected: PropTypes.bool,
  isCurrentDay: PropTypes.bool,
  approvalState: PropTypes.string,
};

export default DayCard;
