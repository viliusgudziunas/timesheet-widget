import React from 'react';
import PropTypes from 'prop-types';
import additionalHoursIcon from '../icons/additional-hours-icon.svg';
import { taskPropTypeShape } from '../helpers';

const AdditionalHours = ({ events }) => {
  return (
    <div className='additional-hours'>
      <div className='additional-hours-header'>
        <img src={additionalHoursIcon} alt='logo' />
        <div className='title'>Additional Hours</div>
      </div>
      <table className='additional-hours-body'>
        <thead>
          <tr className='table-header'>
            <th className='table-type table-header-col'>Type</th>
            <th className='table-amount table-header-col'>Amount</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => {
            return (
              <tr key={event.eventTypeName}>
                <td className='table-type'>{event.eventTypeName}</td>
                <td className='table-amount'>
                  {(
                    Math.round(event.quantity * event.tasksCount * 100) / 100
                  ).toFixed(2)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

AdditionalHours.propTypes = {
  events: PropTypes.arrayOf(taskPropTypeShape),
};

export default AdditionalHours;
