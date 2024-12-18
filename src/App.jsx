import { useEffect, useState } from 'react';
import { getTasks, updateTask, removeTask } from './api/utilityFunctions.js';
import TaskList from './components/TaskList.jsx';
import './App.css';

// const TASKS = [
//   {
//     id: 1,
//     title: 'Mow the lawn',
//     isComplete: false,
//   },
//   {
//     id: 2,
//     title: 'Cook Pasta',
//     isComplete: true,
//   },
// ];

const App = () => {
  const [taskData, setTaskData] = useState([]);

  useEffect(() => {
    getTasks()
      .then((tasks) => {
        setTaskData(tasks);
      })
      .catch((error) => {
        console.log('Could not get tasks:', error);
      });
  }, []);

  const clickCallback = (id, isComplete) => {
    console.log('Task clicked:', id, isComplete);
    const endpoint = isComplete ? 'mark_incomplete' : 'mark_complete';

    updateTask(id, endpoint)
      .then((response) => {
        console.log('Task updated:', id);
        setTaskData(taskData => taskData.map(task => {
          if (task.id === response.id) {
            return {...task, isComplete: response.is_complete};
          } else {
            return task;
          }
        }));
      })
      .catch((error) => {
        console.log('Could not update task:', error);
      });
  };

  const deleteCallback = (id) => {
    console.log('Task deleted:', id);
    removeTask(id)
      .then(() => {
        console.log('Task removed:', id);
        setTaskData(taskData => taskData.filter(task => task.id !== id));
      })
      .catch((error) => {
        console.log('Could not remove task:', error);
      });
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
