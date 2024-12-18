import axios from 'axios';

const kBaseURL = 'http://127.0.0.1:5000';

const getTasksFromAPI = () => {
  return axios.get(`${kBaseURL}/tasks?sort=asc`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log('Could not fetch tasks:', error);
    });
};

export const getTasks = () => {
  return getTasksFromAPI()
    .then((tasks) => {
      return tasks.map(task => {
        return {
          id: task.id,
          title: task.title,
          isComplete: task.is_complete ? true : false,
        };
      });
    })
    .catch((error) => {
      console.log('Could not get tasks:', error);
    });
};

export const updateTask = (id, endpoint) => {
  console.log('Updating task:', id, endpoint);
  return axios.patch(`${kBaseURL}/tasks/${id}/${endpoint}`)
    .then((response) => {
      console.log('Task updated:', response.data.task);
      return response.data.task;
    })
    .catch((error) => {
      console.log('Could not update task:', error);
    });
};

