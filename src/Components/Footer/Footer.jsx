// Footer.jsx
import React from 'react'
import PropTypes from 'prop-types'

import TasksFilter from '../TasksFilter/TasksFilter'

function Footer({ count, filter, onFilterSelect, clearCompleted }) {
  return (
    <footer className="footer">
      <span className="todo-count">
        {count} {count === 1 ? 'item' : 'items'} left
      </span>

      <TasksFilter filter={filter} onFilterSelect={onFilterSelect} />

      <button className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  )
}

Footer.propTypes = {
  count: PropTypes.number,
  filter: PropTypes.string,
  onFilterSelect: PropTypes.func,
  clearCompleted: PropTypes.func,
}

Footer.defaultProps = {
  count: 0,
  filter: 'all',
  onFilterSelect: () => {},
  clearCompleted: () => {},
}

export default Footer
