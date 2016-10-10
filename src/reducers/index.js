import { combineReducers } from 'redux'
/**引入action类型**/
import { ADD_TODO, COMPLETE_TODO, SET_VISIBILITY_FILTER,DEL_TODO,VisibilityFilters } from '../actions'
const { SHOW_ALL } = VisibilityFilters

/******定义reducer 就是一个纯函数，接收旧的 state 和 action，返回新的 state。*******/
/******不用直接去修改state,而是返回新的对象,时刻谨记永远不要在克隆 state 前修改它。*******/
/***********...扩展运算符相当于克隆一个新的对象出来**************/
/************注意每个 reducer 只负责管理全局 state 中它负责的一部分。
每个 reducer 的 state 参数都不同，分别对应它管理的那部分 state 数据。******/

/**
 * 定义过滤方法
 * 默认都返回状态自身 过滤条件默认为show all
 * @param  {[type]} state  [description]
 * @param  {[type]} action [description]
 * @return {[type]}        [description]
 */
function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    break;
    default:
      return state;
    break;
  }
}

/**
 * 定义处理列表的方法,包括添加,完成,删除列表
 * 根据action.type去判断不同的行为 默认都返回state自身
 * @param  {Array}  state  [description]
 * @param  {[type]} action [description]
 * @return {[type]}        [description]
 */
function todos(state = [], action) {
  switch (action.type) {
    /**添加列表 返回自身,加上一个新的对象*/
    case ADD_TODO:
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
    break;
    /**
     * 完成列表 当前需要完成的列表completed属性变为true
     * @type {[type]}
     */
    case COMPLETE_TODO:
      return [
        ...state.slice(0, action.index),
        Object.assign({}, state[action.index], {
          completed: true
        }),
        ...state.slice(action.index + 1)
      ]
    break;
    /**
     * 删除列表 
     * @type {[type]}
     */
    case DEL_TODO:
      return [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1)
      ]
    break;
    default:
      return state
    break;
  }
}

/**
 * 合并2个reducer
 * @type {[type]}
 */
const todoApp = combineReducers({
  visibilityFilter,
  todos
})

export default todoApp