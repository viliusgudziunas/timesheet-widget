import PropTypes from 'prop-types';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const weekends = ['Sun', 'Sat'];

// Date Helpers
const getPreviousDate = (currentDate, previousNumber) => {
  const newDate = new Date(currentDate);
  newDate.setDate(currentDate.getDate() - previousNumber);

  return newDate;
};

export const getFullDate = (date) => {
  return `${date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`}.${
    date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`
  }.${date.getFullYear()}`;
};

const minTimeOfDay = (times) => {
  return times.reduce((time1, time2) => {
    const date1 = new Date(time1);
    const date2 = new Date(time2);

    return date1.getTime() < date2.getTime() ? time1 : time2;
  });
};

const maxTimeOfDay = (times) => {
  return times.reduce((time1, time2) => {
    const date1 = new Date(time1);
    const date2 = new Date(time2);

    return date1.getTime() > date2.getTime() ? time1 : time2;
  });
};

export const getCurrentMonth = (date) => {
  return `${months[date.getMonth()]} ${date.getFullYear()}`;
};

export const quantityToHours = (quantity) => {
  const remainder = quantity % 24;

  const hours = Math.floor(remainder);
  let minutes = Math.floor(60 * (remainder - hours)).toString();
  if (minutes.length === 1) minutes += '0';

  return `${hours}:${minutes}`;
};

// Data Helpers
export const parseData = (date, data) => {
  const parsedData = {};

  [...Array(7)].forEach((e, i) => {
    const prevDate = getPreviousDate(date, 6 - i);
    const weekDay = weekDays[prevDate.getDay()];
    const tasks = data.filter((task) => {
      return (
        task.date ===
        `${prevDate.getFullYear()}-${
          prevDate.getMonth() + 1 > 9
            ? prevDate.getMonth() + 1
            : `0${prevDate.getMonth() + 1}`
        }-${
          prevDate.getDate() > 9 ? prevDate.getDate() : `0${prevDate.getDate()}`
        }`
      );
    });

    parsedData[weekDay] = {
      date: prevDate,
      isWeekend: weekends.includes(weekDay),
      tasks,
    };
  });

  return parsedData;
};

export const getSelectedDayTasks = (tasks, selectedDay) => {
  return tasks[
    Object.keys(tasks).filter((day) => {
      return selectedDay.getDate() === tasks[day].date.getDate();
    })[0]
  ].tasks;
};

export const getTotalDuration = (events) => {
  const firstTaskTime = minTimeOfDay(
    events.map((event) => {
      return event.firstTaskStart;
    })
  );
  const lastTaskTime = maxTimeOfDay(
    events.map((event) => {
      return event.lastTaskEnd;
    })
  );

  return `(${firstTaskTime.substring(12)} - ${lastTaskTime.substring(12)})`;
};

export const getHoursWorked = (tasks) => {
  let hours = 0;

  tasks.forEach((task) => {
    if (task.isHourEventType && task.isWorkHour)
      hours += Math.round(task.tasksCount * task.quantity * 100) / 100;
  });

  return hours === 0 ? null : quantityToHours(hours);
};

export const getApprovalState = (tasks) => {
  let state = '';

  tasks.forEach((task) => {
    if (state !== 'red') {
      if (state !== 'grey') {
        if (task.isRejected) {
          state = 'red';
        } else {
          state = task.isApproved ? 'green' : 'grey';
        }
      } else if (task.isRejected) {
        state = 'red';
      }
    }
  });

  return state;
};

// CSS Classes Helpers
export const getDayCardClasses = (isWeekend) => {
  let css = 'day-card';
  if (isWeekend) css += ' gray-font';

  return css;
};

export const getCalendarDateClasses = (isCurrentDay, isDaySelected) => {
  let css = 'calendar-date';
  if (isCurrentDay) css += ' current-date';
  if (isDaySelected) css += ' selected-date';

  return css;
};

export const getApproavalStateClasses = (approvalState) => {
  let css = 'approval-state';
  if (approvalState === 'red') {
    css += ' tasks-rejected';
  } else if (approvalState === 'green') {
    css += ' tasks-approved';
  } else if (approvalState === 'grey') {
    css += ' tasks-pending';
  }

  return css;
};

// PropTypes Helpers
export const taskPropTypeShape = PropTypes.shape({
  date: PropTypes.string,
  eventTypeName: PropTypes.string,
  firstTaskStart: PropTypes.string,
  isAdditionalHoursEventType: PropTypes.bool,
  isApproved: PropTypes.bool,
  isExpenseEventType: PropTypes.bool,
  isHourEventType: PropTypes.bool,
  isRejected: PropTypes.bool,
  isWorkHour: PropTypes.bool,
  lastTaskEnd: PropTypes.string,
  price: PropTypes.number,
  quantity: PropTypes.number,
  tasksCount: PropTypes.number,
});

export const dayPropTypeShape = PropTypes.shape({
  date: PropTypes.instanceOf(Date),
  isWeekend: PropTypes.bool,
  tasks: PropTypes.arrayOf(taskPropTypeShape),
});
