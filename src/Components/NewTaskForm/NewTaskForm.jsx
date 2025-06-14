import React from 'react'
import './NewTaskForm.css'
import PropTypes from 'prop-types'

class NewTaskForm extends React.Component {
  state = {
    value: '',
    minutes: '',
    seconds: '',
  }

  onLabelChange = (e) => {
    this.setState({
      value: e.target.value,
    })
  }

  onMinutesChange = (e) => {
    this.setState({ minutes: e.target.value })
  }

  onSecondsChange = (e) => {
    this.setState({ seconds: e.target.value })
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { value, minutes, seconds } = this.state
    const emptySpace = value.trim()
    if (!emptySpace) return

    const totalSeconds = parseInt(minutes || '0', 10) * 60 + parseInt(seconds || '0', 10)

    // console.log('Submitting task:', value, 'Time:', totalSeconds)

    this.props.addTask(value, totalSeconds)

    this.setState({
      value: '',
      minutes: '',
      seconds: '',
    })
  }

  render() {
    return (
      <form className="new-todo-form" onSubmit={this.onSubmit}>
        <input
          className="new-todo"
          placeholder="Task"
          autoFocus
          value={this.state.value}
          onChange={this.onLabelChange}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          value={this.state.minutes}
          onChange={this.onMinutesChange}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          value={this.state.seconds}
          onChange={this.onSecondsChange}
        />
        <button type="submit"></button>
      </form>
    )
  }
}

NewTaskForm.defaultProps = {
  addTask: () => {},
}

NewTaskForm.propTypes = {
  addTask: PropTypes.func.isRequired,
}

export default NewTaskForm
