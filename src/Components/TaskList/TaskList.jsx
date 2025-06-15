// TaskList.jsx
import React from 'react'
import PropTypes from 'prop-types'

import Task from '../Task/Task'
import './TaskList.css'

function TaskList({ tasks, toggleTask, deleteTask, startTimer, stopTimer, expireTask }) {
  return (
    <ul className="todo-list">
      {tasks.map((task) => (
        <Task
          key={task.id}
          id={task.id}
          title={task.title}
          completed={task.completed}
          created={task.created}
          timeSpent={task.timeSpent}
          startedAt={task.startedAt}
          toggleTask={() => toggleTask(task.id)}
          deleteTask={() => deleteTask(task.id)}
          startTimer={() => startTimer(task.id)}
          stopTimer={() => stopTimer(task.id)}
          expireTask={() => expireTask(task.id)}
        />
      ))}
    </ul>
  )
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      created: PropTypes.string.isRequired,
      timeSpent: PropTypes.number.isRequired,
      startedAt: PropTypes.string,
    })
  ).isRequired,
  toggleTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  startTimer: PropTypes.func.isRequired,
  stopTimer: PropTypes.func.isRequired,
  expireTask: PropTypes.func.isRequired,
}

export default TaskList
