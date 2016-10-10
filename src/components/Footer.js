import React, { Component, PropTypes } from 'react'

/**
 * 底部过滤列表组件
 */
export default class Footer extends Component {
  /**
   * 渲染过滤条件方法 如果等于过滤条件本身,则不可点击
   * 不等于条件本身,则可以点击触发事件
   * @param  {[type]} filter [description]
   * @param  {[type]} name   [description]
   * @return {[type]}        [description]
   */
  renderFilter(filter, name) {
    if (filter === this.props.filter) {
      return name
    }

    return (
      <a href='#' onClick={e => {
        e.preventDefault()
        /**
         * 调用父组件传递过来的过滤行为
         */
        this.props.onFilterChange(filter)
      }}>
        {name}
      </a>
    )
  }

  render() {
    return (
      <p>
        Show:
        {' '}
        {this.renderFilter('SHOW_ALL', 'All')}
        {', '}
        {this.renderFilter('SHOW_COMPLETED', 'Completed')}
        {', '}
        {this.renderFilter('SHOW_ACTIVE', 'Active')}
      </p>
    )
  }
}

Footer.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  filter: PropTypes.oneOf([
    'SHOW_ALL',
    'SHOW_COMPLETED',
    'SHOW_ACTIVE'
  ]).isRequired
}