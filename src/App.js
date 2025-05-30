import React from 'react'

import './index.css'

import NewTaskForm from './Components/NewTaskForm/NewTaskForm'
import TaskList from './Components/TaskList/TaskList'
import Footer from './Components/Footer/Footer'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.maxId = 100
  }

  state = {
    tasks: [],
    filter: 'all',
  }

  toggleTask = (id) => {
    this.setState(({ tasks }) => ({
      tasks: tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)),
    }))
  }

  deleteTask = (id) => {
    this.setState(({ tasks }) => ({
      tasks: tasks.filter((task) => task.id !== id),
    }))
  }
  addTask = (text) => {
    const newItem = {
      title: text,
      completed: false,
      id: this.maxId++,
      created: new Date().toISOString(),
    }

    this.setState(({ tasks }) => {
      const newArr = [...tasks, newItem]
      return {
        tasks: newArr,
      }
    })
  }

  onFilterSelect = (filter) => {
    this.setState({ filter })
  }

  filter(items, filter) {
    switch (filter) {
      case 'all':
        return items
      case 'active':
        return items.filter((item) => !item.completed)
      case 'completed':
        return items.filter((el) => el.completed)
      default:
        return items
    }
  }

  clearCompleted = () => {
    this.setState(({ tasks }) => ({
      tasks: tasks.filter((task) => !task.completed),
    }))
  }

  render() {
    const completedCount = this.state.tasks.filter((el) => !el.completed).length

    return (
      <section className="todoapp">
        <NewTaskForm addTask={this.addTask} />
        <section className="main">
          <TaskList
            tasks={this.filter(this.state.tasks, this.state.filter)}
            toggleTask={this.toggleTask}
            deleteTask={this.deleteTask}
          />
        </section>

        <Footer
          filter={this.state.filter}
          count={completedCount}
          onFilterSelect={this.onFilterSelect}
          clearCompleted={this.clearCompleted}
        />
      </section>
    )
  }
}

export default App
