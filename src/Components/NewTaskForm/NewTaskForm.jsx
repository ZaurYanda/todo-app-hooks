import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './NewTaskForm.css'

function NewTaskForm({ addTask }) {
  const [value, setValue] = useState('')
  const [minutes, setMinutes] = useState('')
  const [seconds, setSeconds] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    const taskText = value.trim()
    if (!taskText) return

    const totalSeconds = parseInt(minutes || '0', 10) * 60 + parseInt(seconds || '0', 10)
    addTask(taskText, totalSeconds)

    setValue('')
    setMinutes('')
    setSeconds('')
  }

  return (
    <form className="new-todo-form" onSubmit={onSubmit}>
      <input
        className="new-todo"
        placeholder="Task"
        autoFocus
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <input
        className="new-todo-form__timer"
        placeholder="Min"
        value={minutes}
        onChange={(e) => setMinutes(e.target.value)}
      />
      <input
        className="new-todo-form__timer"
        placeholder="Sec"
        value={seconds}
        onChange={(e) => setSeconds(e.target.value)}
      />
      <button type="submit"></button>
    </form>
  )
}

NewTaskForm.propTypes = {
  addTask: PropTypes.func.isRequired,
}

export default NewTaskForm
