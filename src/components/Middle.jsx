import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Hours from './Hours';
import Expenses from './Expenses';
import AdditionalHours from './AdditionalHours';
import {
  days,
  getFullDate,
  getTotalDuration,
  taskPropTypeShape,
} from '../helpers';

const Middle = ({ date, tasks }) => {
  const today = getFullDate(date);

  const hoursEvents = tasks.filter((task) => {
    return task.isHourEventType;
  });

  const expensesEvenets = tasks.filter((task) => {
    return task.isExpenseType;
  });

  const additionalHoursEvents = tasks.filter((task) => {
    return task.isAdditionalHoursEventType;
  });

  return (
    <div className='middle'>
      <div className='middle-header'>
        <div className='today'>{days[date.getDay()]}</div>
        <div className='full-date'>{today}</div>
        <Link to='/timesheet' className='link'>
          <button className='go-to-timesheet' type='button'>
            GO TO TIMESHEET
          </button>
        </Link>
      </div>
      {hoursEvents.length > 0 && (
        <Hours
          events={hoursEvents}
          totalDuration={getTotalDuration(hoursEvents)}
        />
      )}
      {expensesEvenets.length > 0 && <Expenses events={expensesEvenets} />}
      {additionalHoursEvents.length > 0 && (
        <AdditionalHours events={additionalHoursEvents} />
      )}
    </div>
  );
};

Middle.propTypes = {
  date: PropTypes.instanceOf(Date),
  tasks: PropTypes.arrayOf(taskPropTypeShape),
};

export default Middle;
