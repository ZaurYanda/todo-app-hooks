import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'

import './Task.css'

function Task({
  id,
  title,
  completed,
  created,
  timeSpent,
  startedAt,
  toggleTask,
  deleteTask,
  startTimer,
  stopTimer,
  expireTask,
}) {
  const intervalRef = useRef(null)
  const [, setTick] = useState(0)

  const getRemaining = () => {
    if (!startedAt) return timeSpent
    const elapsed = Math.floor((Date.now() - new Date(startedAt)) / 1000)
    return Math.max(0, timeSpent - elapsed)
  }

  const remaining = getRemaining()
  const mins = Math.floor(remaining / 60)
  const secs = String(remaining % 60).padStart(2, '0')
  const ago = formatDistanceToNow(new Date(created), { includeSeconds: true, addSuffix: true })

  useEffect(() => {
    if (startedAt && !intervalRef.current) {
      intervalRef.current = setInterval(() => {
        const elapsed = Math.floor((Date.now() - new Date(startedAt)) / 1000)
        if (elapsed >= timeSpent) {
          clearInterval(intervalRef.current)
          intervalRef.current = null
          expireTask(id)
        } else {
          setTick((prev) => prev + 1) // Тригерим перерендер каждую секунду
        }
      }, 1000)
    }

    if (!startedAt && intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    return () => {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [startedAt, timeSpent, id, expireTask])

  return (
    <li className={completed ? 'completed' : ''}>
      <div className="view">
        <input type="checkbox" checked={completed} onChange={toggleTask} className="toggle" />
        <label
          className="task-content"
          onClick={(e) => {
            if (e.target.classList.contains('task-content')) {
              e.preventDefault()
            }
          }}
        >
          <span className="description">{title}</span>
          <span className="timer-block">
            <button className="icon-play" onClick={startTimer} />
            <button className="icon-pause" onClick={stopTimer} />
            <span className="timer-text">
              {mins}:{secs}
            </span>
          </span>
          <span className="created">created {ago}</span>
        </label>
        <button className="icon icon-edit" />
        <button className="icon icon-destroy" onClick={deleteTask} />
      </div>
    </li>
  )
}

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string,
  completed: PropTypes.bool,
  created: PropTypes.string,
  timeSpent: PropTypes.number,
  startedAt: PropTypes.string,
  toggleTask: PropTypes.func,
  deleteTask: PropTypes.func,
  startTimer: PropTypes.func,
  stopTimer: PropTypes.func,
  expireTask: PropTypes.func,
}

Task.defaultProps = {
  title: '',
  completed: false,
  created: '',
  timeSpent: 0,
  startedAt: null,
  toggleTask: () => {},
  deleteTask: () => {},
  startTimer: () => {},
  stopTimer: () => {},
  expireTask: () => {},
}

export default Task
