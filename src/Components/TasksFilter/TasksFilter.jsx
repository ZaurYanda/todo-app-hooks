import React from 'react'
import PropTypes from 'prop-types'
class TasksFilter extends React.Component {
  render() {
    const { filter, onFilterSelect } = this.props

    const buttons = [
      { name: 'all', label: 'All' },
      { name: 'active', label: 'Active' },
      { name: 'completed', label: 'Completed' },
    ]

    const btns = buttons.map(({ name, label }) => {
      const active = filter === name
      const clazz = active ? 'selected' : ''

      return (
        // <ul className="filters">
        <li key={name} className="filters">
          <button type="button" className={`btn ${clazz}`} onClick={() => onFilterSelect(name)}>
            {label}
          </button>
        </li>
      )
    })
    return <>{btns}</>
  }
}

TasksFilter.defaultProps = {
  filter: 'all',
  onFilterSelect: () => {},
}

TasksFilter.propTypes = {
  onFilterSelect: PropTypes.func,
  filter: PropTypes.string,
}

export default TasksFilter
