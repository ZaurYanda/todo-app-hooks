// App.js
import React, { useState, useRef, useCallback } from 'react'
import './index.css'

import NewTaskForm from './Components/NewTaskForm/NewTaskForm'
import TaskList from './Components/TaskList/TaskList'
import Footer from './Components/Footer/Footer'

let maxId = 100

function App() {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('all')
  const timerIds = useRef({})

  const toggleTask = useCallback((id) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) => {
        if (task.id === id) {
          const isNowCompleted = !task.completed

          if (isNowCompleted && timerIds.current[id]) {
            clearInterval(timerIds.current[id])
            delete timerIds.current[id]
          }

          if (!isNowCompleted && task.timeSpent > 0) {
            if (timerIds.current[id]) {
              clearInterval(timerIds.current[id])
            }
            timerIds.current[id] = setInterval(() => {
              setTasks((tasks) =>
                tasks.map((t) => {
                  if (t.id === id && t.isTimerRunning) {
                    const newTime = t.timeSpent - 1
                    if (newTime <= 0) {
                      clearInterval(timerIds.current[id])
                      delete timerIds.current[id]
                      return { ...t, timeSpent: 0, isTimerRunning: false }
                    }
                    return { ...t, timeSpent: newTime }
                  }
                  return t
                })
              )
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
      return updatedTasks
    })
  }, [])

  const deleteTask = useCallback((id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }, [])

  const addTask = useCallback((text, initialTime) => {
    const newItem = {
      title: text,
      completed: false,
      id: maxId++,
      created: new Date().toISOString(),
      timeSpent: initialTime,
      isTimerRunning: false,
    }
    setTasks((prev) => [...prev, newItem])
  }, [])

  const onFilterSelect = useCallback((filter) => {
    setFilter(filter)
  }, [])

  const filterTasks = useCallback((items, filter) => {
    switch (filter) {
      case 'active':
        return items.filter((item) => !item.completed)
      case 'completed':
        return items.filter((item) => item.completed)
      default:
        return items
    }
  }, [])

  const clearCompleted = useCallback(() => {
    setTasks((prev) => prev.filter((task) => !task.completed))
  }, [])

  const startPauseTimer = useCallback(
    (id) => {
      const task = tasks.find((t) => t.id === id)
      if (!task) return

      if (task.isTimerRunning) {
        clearInterval(timerIds.current[id])
        delete timerIds.current[id]
        setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, isTimerRunning: false } : t)))
      } else {
        timerIds.current[id] = setInterval(() => {
          setTasks((prev) =>
            prev.map((t) => {
              if (t.id === id) {
                const newTime = t.timeSpent - 1
                if (newTime <= 0) {
                  clearInterval(timerIds.current[id])
                  delete timerIds.current[id]
                  return { ...t, timeSpent: 0, isTimerRunning: false }
                }
                return { ...t, timeSpent: newTime }
              }
              return t
            })
          )
        }, 1000)

        setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, isTimerRunning: true } : t)))
      }
    },
    [tasks]
  )

  const visibleTasks = filterTasks(tasks, filter)
  const completedCount = tasks.filter((el) => !el.completed).length

  return (
    <section className="todoapp">
      <NewTaskForm addTask={addTask} />
      <section className="main">
        <TaskList
          tasks={visibleTasks}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
          startPauseTimer={startPauseTimer}
        />
      </section>
      <Footer filter={filter} count={completedCount} onFilterSelect={onFilterSelect} clearCompleted={clearCompleted} />
    </section>
  )
}

export default App
