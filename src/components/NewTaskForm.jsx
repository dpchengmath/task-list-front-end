import { useState } from 'react';
import PropTypes from 'prop-types';

const NewTaskForm = ({ handleSubmit }) => {
  const [taskTitle, setTaskTitle] = useState('');

  const handleTaskNameChange = event => {
    setTaskTitle(event.target.value);
  };

  const onHandleSubmit = (event) => {
    event.preventDefault();
    const newTask = {
      title: taskTitle,
      description: ''
    };
    handleSubmit(newTask);
    setTaskTitle('');
  };

  return (
    <form onSubmit={onHandleSubmit}>
      <label htmlFor="taskTitle">Task Name: </label>
      <input type="text" id="taskTitle" name="taskTitle" value={taskTitle} onChange={handleTaskNameChange}/>
      <div>
        <input type="submit" value="Add a task" />
      </div>
    </form>
  );
};

NewTaskForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default NewTaskForm;