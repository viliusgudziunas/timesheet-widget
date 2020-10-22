import React from 'react';
import PropTypes from 'prop-types';
import expensesIcon from '../icons/expenses-icon.svg';
import { taskPropTypeShape } from '../helpers';

const Expenses = ({ events }) => {
  return (
    <div className='expenses'>
      <div className='expenses-header'>
        <img src={expensesIcon} alt='logo' />
        <div className='title'>Expenses</div>
      </div>
      <table className='expenses-body'>
        <thead>
          <tr className='table-header'>
            <th className='table-type table-header-col'>Type</th>
            <th className='table-quantity table-header-col'>Quantity</th>
            <th className='table-total table-header-col'>Total</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => {
            return (
              <tr key={event.eventTypeName}>
                <td className='table-type'>{event.eventTypeName}</td>
                <td className='table-quantity'>{event.quantity}</td>
                <td className='table-total'>
                  {Math.round(event.price * event.quantity * 100) / 100}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

Expenses.propTypes = {
  events: PropTypes.arrayOf(taskPropTypeShape),
};

export default Expenses;
