import React from 'react';
import PropTypes from 'prop-types';
import CalendarHeader from './CalendarHeader';
import DayPanel from './DayPanel';
import { dayPropTypeShape } from '../helpers';

const Calendar = ({ date, tasks, selectedDate, handleSelectedDayChange }) => {
  return (
    <div className='calendar'>
      <CalendarHeader
        date={date}
        selectedDate={selectedDate}
        handleSelectedDayChange={handleSelectedDayChange}
      />
      <DayPanel
        date={date}
        selectedDate={selectedDate}
        handleSelectedDayChange={handleSelectedDayChange}
        tasks={tasks}
      />
    </div>
  );
};

Calendar.propTypes = {
  date: PropTypes.instanceOf(Date),
  tasks: PropTypes.shape({
    Mon: dayPropTypeShape,
    Tue: dayPropTypeShape,
    Wed: dayPropTypeShape,
    Thu: dayPropTypeShape,
    Fri: dayPropTypeShape,
    Sat: dayPropTypeShape,
    Sun: dayPropTypeShape,
  }),
  selectedDate: PropTypes.instanceOf(Date),
  handleSelectedDayChange: PropTypes.func,
};

export default Calendar;
