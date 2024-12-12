import PropTypes from 'prop-types';

import './Task.css';

const Task = ({ id, title, isComplete, handleTaskToggle, handleRemoveTask }) => {
  const buttonClass = isComplete ? 'tasks__item__toggle--completed' : '';

  return (
    <li className="tasks__item">
      <button
        className={`tasks__item__toggle ${buttonClass}`}
        onClick={() => handleTaskToggle(id)}
      >
        {title}
      </button>
      <button
        className="tasks__item__remove button"
        onClick={() => handleRemoveTask(id)}>x</button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  handleTaskToggle: PropTypes.func.isRequired,
  handleRemoveTask: PropTypes.func.isRequired,
};

export default Task;
