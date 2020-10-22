import React, { useState } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Calendar from './components/Calendar';
import Middle from './components/Middle';
import Bottom from './components/Bottom';
import mockData from './data.json';
import { parseData, getSelectedDayTasks } from './helpers';

function App() {
  const date = new Date();
  const tasks = parseData(date, mockData);

  const [selectedDate, setSelectedDate] = useState(date);
  const [selectedDayTasks, setSelectedDayTasks] = useState(
    getSelectedDayTasks(tasks, selectedDate)
  );

  const handleSelectedDayChange = (newDate) => {
    setSelectedDate(newDate);
    setSelectedDayTasks(getSelectedDayTasks(tasks, newDate));
  };

  return (
    <Router>
      <Switch>
        <Route path='/' exact>
          <div className='app'>
            <div className='outer'>
              <Calendar
                date={date}
                tasks={tasks}
                selectedDate={selectedDate}
                handleSelectedDayChange={handleSelectedDayChange}
              />
              <Middle date={selectedDate} tasks={selectedDayTasks} />
              <Bottom />
            </div>
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
