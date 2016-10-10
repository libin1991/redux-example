import React, { Component, PropTypes } from 'react'

/**
 * 添加列表组件
 */
export default class AddTodo extends Component {
  render() {
    return (
      <div>
        <input type='text' ref='input' />
        <button onClick={(e) => this.handleClick(e)}>
          Add
        </button>
      </div>
    )
  }
  /**
   * 添加列表事件
   * @param  {[type]} e [description]
   * @return {[type]}   [description]
   */
  handleClick(e) {
    const node = this.refs.input;
    const text = node.value.trim();
    //如果添加值为空,则不添加
    if(text===''){
      return false;
    }
    //调用父组件传递过来的添加行为
    this.props.onAddClick(text)
    node.value = ''
  }
}

AddTodo.propTypes = {
  onAddClick: PropTypes.func.isRequired
}