// TasksFilter.jsx
import React from 'react'
import PropTypes from 'prop-types'

function TasksFilter({ filter, onFilterSelect }) {
  const buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ]

  return (
    <ul className="filters">
      {buttons.map(({ name, label }) => {
        const isActive = filter === name
        const className = isActive ? 'selected' : ''

        return (
          <li key={name}>
            <button type="button" className={`btn ${className}`} onClick={() => onFilterSelect(name)}>
              {label}
            </button>
          </li>
        )
      })}
    </ul>
  )
}

TasksFilter.propTypes = {
  filter: PropTypes.string,
  onFilterSelect: PropTypes.func,
}

TasksFilter.defaultProps = {
  filter: 'all',
  onFilterSelect: () => {},
}

export default TasksFilter
