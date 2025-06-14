import React from 'react'
import './Task.css'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'

class Task extends React.Component {
  render() {
    const { title, completed, created, toggleTask, deleteTask, timeSpent, startPauseTimer } = this.props

    const createTask = formatDistanceToNow(new Date(created), {
      includeSeconds: true,
      addSuffix: true,
    })

    return (
      <li className={completed ? 'completed' : ''}>
        <div className="view">
          <input className="toggle" type="checkbox" checked={completed} onChange={toggleTask} />

          <label className="task-content">
            <span className="description">{title}</span>

            <span className="timer-block">
              <button className="icon-play" onClick={startPauseTimer}></button>
              <button className="icon-pause" onClick={startPauseTimer}></button>
              <span className="timer-text">
                {Math.floor(timeSpent / 60)}:{String(timeSpent % 60).padStart(2, '0')}
              </span>
            </span>

            <span className="created">created {createTask}</span>
          </label>

          <button className="icon icon-edit" />
          <button className="icon icon-destroy" onClick={deleteTask} />
        </div>
      </li>
    )
  }
}

Task.defaultProps = {
  completed: false,
  created: 'just now',
  timeSpent: 0,
  isTimerRunning: false,
  startPauseTimer: () => {},
}

Task.propTypes = {
  title: PropTypes.string,
  completed: PropTypes.bool,
  created: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  toggleTask: PropTypes.func,
  deleteTask: PropTypes.func,
  timeSpent: PropTypes.number,
  isTimerRunning: PropTypes.bool,
  startPauseTimer: PropTypes.func,
}

export default Task
