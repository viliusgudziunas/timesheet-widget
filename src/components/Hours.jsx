import React from 'react';
import PropTypes from 'prop-types';
import clockIcon from '../icons/clock-icon.svg';
import { quantityToHours, taskPropTypeShape } from '../helpers';

const Hours = ({ events, totalDuration }) => {
  return (
    <div className='hours'>
      <div className='hours-header'>
        <div className='test'>
          <img src={clockIcon} alt='logo' />
        </div>
        <div className='title'>Hours</div>
        <div className='hours-duration'>{totalDuration}</div>
      </div>
      <table className='hours-body'>
        <thead>
          <tr className='table-header'>
            <th className='table-type table-header-col'>Type</th>
            <th className='table-duration table-header-col'>Duration</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => {
            return (
              <tr key={event.eventTypeName}>
                <td className='table-type'>{event.eventTypeName}</td>
                <td className='table-duration'>
                  {quantityToHours(
                    Math.round(event.tasksCount * event.quantity * 100) / 100
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

Hours.propTypes = {
  events: PropTypes.arrayOf(taskPropTypeShape),
  totalDuration: PropTypes.string,
};

export default Hours;
