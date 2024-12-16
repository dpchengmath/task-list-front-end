import PropTypes from 'prop-types';
import Task from './Task.jsx';
import './TaskList.css';

const TaskList = ({ tasks, onClickCallback, onDeleteCallback }) => {
  return(
    <ul className="tasks__list no-bullet">
      {tasks.map((task) => {
        return (
          <Task
            key={task.id}
            id={task.id}
            title={task.title}
            isComplete={task.isComplete}
            handleClickCallback={onClickCallback}
            handleDeleteCallback={onDeleteCallback}
          />
        );
      })}
    </ul>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      isComplete: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onClickCallback: PropTypes.func,
  onDeleteCallback: PropTypes.func,
};

export default TaskList;
