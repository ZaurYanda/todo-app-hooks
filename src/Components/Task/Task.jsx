import React from 'react'
import './Task.css'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'
class Task extends React.Component {
  render() {
    const { title, completed, created, toggleTask, deleteTask } = this.props

    const createTask = formatDistanceToNow(new Date(created), { includeSeconds: true, addSuffix: true })
    return (
      <li className={completed ? 'completed' : ''}>
        <div className="view">
          <input className="toggle" type="checkbox" checked={completed} onChange={toggleTask} />

          <label>
            <span className="description">{title}</span>
            <span className="created">{`created ${createTask}`}</span>
          </label>
          <button className="icon icon-destroy" onClick={deleteTask}></button>
          <button className="icon icon-edit"></button>
        </div>
      </li>
    )
  }
}

Task.defaultProps = {
  completed: false,
  created: 'just now',
}

Task.propTypes = {
  title: PropTypes.string,
  completed: PropTypes.bool,
  created: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  toggleTask: PropTypes.func,
  deleteTask: PropTypes.func,
}

export default Task
