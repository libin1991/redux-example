/************改变state状态的行为我们记录为action*********************/

/*
 * action 类型
 */

export const ADD_TODO = 'ADD_TODO';//添加列表
export const COMPLETE_TODO = 'COMPLETE_TODO';//列表完成
export const DEL_TODO = 'DEL_TODO';//删除列表
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';//过滤列表

/*
 * 过滤列表的几个属性
 */

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',//显示全部
  SHOW_COMPLETED: 'SHOW_COMPLETED',//显示完成的
  SHOW_ACTIVE: 'SHOW_ACTIVE'//显示未完成的
};

/*
 * action 创建函数
 */

/**
 * 添加列表行为
 * @param {[type]} text [description]
 */
export function addTodo(text) {
  return { type: ADD_TODO, text }
}

/**
 * 完成列表行为
 * @param {[type]} text [description]
 */
export function completeTodo(index) {
  return { type: COMPLETE_TODO, index }
}

/**
 * 删除列表行为
 * @param {[type]} text [description]
 */
export function delTodo(index) {
  return { type: DEL_TODO, index }
}

/**
 * 过滤列表行为
 * @param {[type]} text [description]
 */
export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter }
}