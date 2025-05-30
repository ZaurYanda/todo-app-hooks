import React from 'react'
import './NewTaskForm.css'
import PropTypes from 'prop-types'
class NewTaskForm extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     inputValue: '',

  //   }
  // }

  state = {
    value: '',
  }

  onLabelChange = (e) => {
    this.setState({
      value: e.target.value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    const emptySpace = this.state.value.trim()
    if (!emptySpace) return
    this.props.addTask(this.state.value)
    this.setState({
      value: '',
    })
  }

  render() {
    return (
      <form className="header" onSubmit={this.onSubmit}>
        <h1>todos</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onChange={this.onLabelChange}
          value={this.state.value}
        />
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
