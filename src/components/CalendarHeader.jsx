import React from 'react';
import PropTypes from 'prop-types';
import calendarIcon from '../icons/calendar-icon.svg';
import { getCurrentMonth } from '../helpers';

const CalendarHeader = ({ date, selectedDate, handleSelectedDayChange }) => {
  return (
    <div className='calendar-header'>
      <div className='current-month'>{getCurrentMonth(selectedDate)}</div>
      <div
        className='calendar-icon'
        onClick={() => handleSelectedDayChange(date)}
        aria-hidden='true'
      >
        <img src={calendarIcon} alt='logo' />
      </div>
    </div>
  );
};

CalendarHeader.propTypes = {
  date: PropTypes.instanceOf(Date),
  selectedDate: PropTypes.instanceOf(Date),
  handleSelectedDayChange: PropTypes.func,
};

export default CalendarHeader;
