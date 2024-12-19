import PropTypes from 'prop-types';
import './Task.css';

const Task = ({ id, title, isComplete, handleClickCallback, handleDeleteCallback }) => {
  const buttonClass = isComplete ? 'tasks__item__toggle--completed' : '';

  return (
    <li className="tasks__item">
      <button
        className={`tasks__item__toggle ${buttonClass}`}
        onClick={() => handleClickCallback(id, isComplete)}
      >
        {title}
      </button>
      <button
        className="tasks__item__remove button"
        onClick={() => handleDeleteCallback(id)}>x</button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  handleClickCallback: PropTypes.func.isRequired,
  handleDeleteCallback: PropTypes.func.isRequired,
};

export default Task;
