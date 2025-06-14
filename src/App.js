import React from 'react'

import './index.css'

import NewTaskForm from './Components/NewTaskForm/NewTaskForm'
import TaskList from './Components/TaskList/TaskList'
import Footer from './Components/Footer/Footer'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.maxId = 100
    this.timerIds = {}
  }

  state = {
    tasks: [],
    filter: 'all',
  }

  toggleTask = (id) => {
    this.setState(({ tasks }) => {
      const updatedTasks = tasks.map((task) => {
        if (task.id === id) {
          const isNowCompleted = !task.completed

          if (isNowCompleted && this.timerIds[id]) {
            clearInterval(this.timerIds[id])
            delete this.timerIds[id]
          }

          if (!isNowCompleted && task.timeSpent > 0) {
            if (this.timerIds[id]) {
              clearInterval(this.timerIds[id])
            }

            this.timerIds[id] = setInterval(() => {
              this.setState(({ tasks }) => ({
                tasks: tasks.map((t) => {
                  if (t.id === id && t.isTimerRunning) {
                    const newTime = t.timeSpent - 1
                    if (newTime <= 0) {
                      clearInterval(this.timerIds[id])
                      delete this.timerIds[id]
                      return { ...t, timeSpent: 0, isTimerRunning: false }
                    }
                    return { ...t, timeSpent: newTime }
                  }
                  return t
                }),
              }))
            }, 1000)
          }

          return {
            ...task,
            completed: isNowCompleted,
            isTimerRunning: !isNowCompleted && task.timeSpent > 0,
          }
        }

        return task
      })

      return { tasks: updatedTasks }
    })
  }

  deleteTask = (id) => {
    this.setState(({ tasks }) => ({
      tasks: tasks.filter((task) => task.id !== id),
    }))
  }
  addTask = (text, initialTime) => {
    const newItem = {
      title: text,
      completed: false,
      id: this.maxId++,
      created: new Date().toISOString(),
      timeSpent: initialTime,
      isTimerRunning: false,
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

  startPauseTimer = (id) => {
    const task = this.state.tasks.find((t) => t.id === id)

    if (!task) return

    if (task.isTimerRunning) {
      clearInterval(this.timerIds[id])
      delete this.timerIds[id]

      this.setState(({ tasks }) => ({
        tasks: tasks.map((t) => (t.id === id ? { ...t, isTimerRunning: false } : t)),
      }))
    } else {
      this.timerIds[id] = setInterval(() => {
        this.setState(({ tasks }) => ({
          tasks: tasks.map((t) => {
            if (t.id === id) {
              const newTime = t.timeSpent - 1
              if (newTime <= 0) {
                clearInterval(this.timerIds[id])
                delete this.timerIds[id]
                return {
                  ...t,
                  timeSpent: 0,
                  isTimerRunning: false,
                }
              }
              return {
                ...t,
                timeSpent: newTime,
              }
            }
            return t
          }),
        }))
      }, 1000)

      this.setState(({ tasks }) => ({
        tasks: tasks.map((t) => (t.id === id ? { ...t, isTimerRunning: true } : t)),
      }))
    }
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
            startPauseTimer={this.startPauseTimer}
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
