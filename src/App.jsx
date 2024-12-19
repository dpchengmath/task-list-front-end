import { useEffect, useState } from 'react';
import { convertFromApi, getTasksFromAPI} from './api/utilityFunctions.js';
import TaskList from './components/TaskList.jsx';
import './App.css';
import axios from 'axios';
import NewTaskForm from './components/NewTaskForm.jsx';

const kBaseURL = 'http://127.0.0.1:5000';

const App = () => {
  const [taskData, setTaskData] = useState([]);

  useEffect(() => {
    getTasksFromAPI()
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
    axios.patch(`${kBaseURL}/tasks/${id}/${endpoint}`)
      .then((response) => {
        console.log(response);
        setTaskData(taskData => taskData.map(task => {
          if (task.id === response.data.task.id) {
            return {...task, isComplete: response.data.task.is_complete};
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
    axios.delete(`${kBaseURL}/tasks/${id}`)
      .then(() => {
        setTaskData(taskData => taskData.filter(task => task.id !== id));
        console.log('Task removed:', id);
      })
      .catch((error) => {
        console.log('Could not remove task:', error);
      });
  };

  const handleSubmit = (newTaskData) => {
    axios.post(`${kBaseURL}/tasks`, newTaskData)
      .then((response) => {
        setTaskData((prevTasks) => [convertFromApi(response.data.task), ...prevTasks]);
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          <NewTaskForm handleSubmit={handleSubmit}/>
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
