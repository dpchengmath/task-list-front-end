import axios from 'axios';

const kBaseURL = 'http://127.0.0.1:5000';

export const convertFromApi = (apiTask) => {
  const newTask = {
    id: apiTask.id,
    title: apiTask.title,
    isComplete: apiTask.is_complete
  };

  return newTask;
};

export const getTasksFromAPI = () => {
  return axios.get(`${kBaseURL}/tasks?sort=asc`)
    .then((response) => {
      return response.data.map(task => {
        return {
          id: task.id,
          title: task.title,
          isComplete: task.is_complete,
        };
      });
    })
    .catch((error) => {
      console.log('Could not fetch tasks:', error);
    });
};

