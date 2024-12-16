import TaskList from './components/TaskList.jsx';
import { useState } from 'react';
import './App.css';

const TASKS = [
  {
    id: 1,
    title: 'Mow the lawn',
    isComplete: false,
  },
  {
    id: 2,
    title: 'Cook Pasta',
    isComplete: true,
  },
];

const App = () => {
  const [taskData, setTaskData] = useState(TASKS);

  const clickCallback = (id) => {
    setTaskData(taskData => taskData.map(task => {
      if (task.id === id) {
        return {...task, isComplete: !task.isComplete};
      } else {
        return task;
      }
    }));
  };

  const deleteCallback = (id) => {
    setTaskData(taskData => taskData.filter(task => {
      return task.id !== id;
    }));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          <TaskList
            tasks={taskData}
            onClickCallback={clickCallback}
            onDeleteCallback={deleteCallback}/>
        </div>
      </main>
    </div>
  );
};

export default App;
