import React from 'react'
import PropTypes from 'prop-types'

import Task from '../Task/Task'

import './TaskList.css'

class TaskList extends React.Component {
  render() {
    const { tasks, toggleTask, deleteTask } = this.props
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
          />
        ))}
      </ul>
    )
  }
}

TaskList.defaultProps = {
  toggleTask: () => {},
  deleteTask: () => {},
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      created: PropTypes.instanceOf(Date),
    })
  ).isRequired,
  toggleTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
}

export default TaskList
