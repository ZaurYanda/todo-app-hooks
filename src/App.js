// App.jsx
import React, { useState, useCallback } from 'react'

import './index.css'
import NewTaskForm from './Components/NewTaskForm/NewTaskForm'
import TaskList from './Components/TaskList/TaskList'
import Footer from './Components/Footer/Footer'

let maxId = 100

function App() {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('all')

  const addTask = (text, initialTime) => {
    const newItem = {
      title: text,
      completed: false,
      id: maxId++,
      created: new Date().toISOString(),
      timeSpent: initialTime,
      startedAt: null,
    }
    setTasks((prev) => [...prev, newItem])
  }

  const startTimer = useCallback((id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id && !t.startedAt ? { ...t, startedAt: new Date().toISOString() } : t))
    )
  }, [])

  const stopTimer = useCallback((id) => {
    const now = new Date()
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== id || !t.startedAt) return t
        const elapsed = Math.floor((now - new Date(t.startedAt)) / 1000)
        const remaining = Math.max(0, t.timeSpent - elapsed)
        return { ...t, startedAt: null, timeSpent: remaining }
      })
    )
  }, [])

  const expireTask = useCallback((id) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, startedAt: null, timeSpent: 0 } : t)))
  }, [])

  const toggleTask = useCallback((id) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t
        const now = new Date()
        const toggled = !t.completed
        if (toggled) {
          let updatedTime = t.timeSpent
          if (t.startedAt) {
            const elapsed = Math.floor((now - new Date(t.startedAt)) / 1000)
            updatedTime = Math.max(0, t.timeSpent - elapsed)
          }
          return { ...t, completed: true, startedAt: null, timeSpent: updatedTime }
        } else {
          return { ...t, completed: false }
        }
      })
    )
  }, [])

  const deleteTask = useCallback((id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const clearCompleted = useCallback(() => {
    setTasks((prev) => prev.filter((t) => !t.completed))
  }, [])

  const filterItems = (items, filter) => {
    switch (filter) {
      case 'active':
        return items.filter((i) => !i.completed)
      case 'completed':
        return items.filter((i) => i.completed)
      default:
        return items
    }
  }

  const visibleTasks = filterItems(tasks, filter)
  const count = tasks.filter((t) => !t.completed).length

  return (
    <section className="todoapp">
      <NewTaskForm addTask={addTask} />
      <section className="main">
        <TaskList
          tasks={visibleTasks}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
          startTimer={startTimer}
          stopTimer={stopTimer}
          expireTask={expireTask}
        />
      </section>
      <Footer filter={filter} count={count} onFilterSelect={setFilter} clearCompleted={clearCompleted} />
    </section>
  )
}

export default App
