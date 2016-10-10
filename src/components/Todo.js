import React, { Component, PropTypes } from 'react'

/**
 * 单个列表组件
 */
export default class Todo extends Component {
  render() {
    /**
     * 调用父组件传递过来的完成列表行为 this.props.onClick
     * 调用父组件传递过来的删除列表行为 this.props.onDel
     * @type {Object}
     */
    return (
      <li>   
        <span onClick={this.props.onClick} 
        style={{
          textDecoration: this.props.completed ? 'line-through' : 'none',
          cursor: this.props.completed ? 'default' : 'pointer'
        }} >
        {this.props.text}
        </span>
        <span style={{color:'blue',marginLeft:'10px' }} onClick={this.props.onDel}>删除</span>
      </li>
    )
  }
}

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired
}