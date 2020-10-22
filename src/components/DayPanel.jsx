import React from 'react';
import PropTypes from 'prop-types';
import DayCard from './DayCard';
import { getHoursWorked, getApprovalState, dayPropTypeShape } from '../helpers';

const DayPanel = ({ tasks, selectedDate, handleSelectedDayChange }) => {
  return (
    <div className='day-panel'>
      {Object.keys(tasks).map((day, i) => {
        const { date } = tasks[day];
        const calendarDate = date.getDate();

        return (
          <div
            onClick={() => handleSelectedDayChange(date)}
            aria-hidden='true'
            key={date}
          >
            <DayCard
              shortDayName={day}
              calendarDate={calendarDate}
              hoursWorked={getHoursWorked(tasks[day].tasks)}
              isWeekend={tasks[day].isWeekend}
              isDaySelected={calendarDate === selectedDate.getDate()}
              isCurrentDay={i === 6}
              approvalState={getApprovalState(
                tasks[day].tasks.filter((task) => {
                  return task.isHourEventType;
                })
              )}
            />
          </div>
        );
      })}
    </div>
  );
};

DayPanel.propTypes = {
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

export default DayPanel;
