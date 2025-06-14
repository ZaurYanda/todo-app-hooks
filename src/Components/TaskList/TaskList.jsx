import React from 'react'
import PropTypes from 'prop-types'

import Task from '../Task/Task'
import './TaskList.css'

function TaskList({ tasks, toggleTask, deleteTask, startPauseTimer }) {
  return (
    <ul className="todo-list">
      {tasks.map((task) => (
        <Task
          key={task.id}
          completed={task.completed}
          toggleTask={() => toggleTask(task.id)}
          deleteTask={() => deleteTask(task.id)}
          title={task.title}
          created={task.created}
          timeSpent={task.timeSpent}
          isTimerRunning={task.isTimerRunning}
          startPauseTimer={() => startPauseTimer(task.id)}
        />
      ))}
    </ul>
  )
}

TaskList.defaultProps = {
  toggleTask: () => {},
  deleteTask: () => {},
  startPauseTimer: () => {},
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      created: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
      timeSpent: PropTypes.number.isRequired,
      isTimerRunning: PropTypes.bool.isRequired,
    })
  ).isRequired,
  toggleTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  startPauseTimer: PropTypes.func.isRequired,
}

export default TaskList
