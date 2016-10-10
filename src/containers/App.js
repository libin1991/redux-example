import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
/** 引入action方法 */
import { addTodo, completeTodo,delTodo,setVisibilityFilter,VisibilityFilters } from '../actions'
import AddTodo from '../components/AddTodo'
import TodoList from '../components/TodoList'
import Footer from '../components/Footer'

/*************明智的做法是只在最顶层组件（如路由操作）里使用 Redux。
其余内部组件仅仅是展示性的，所有数据都通过 props 传入。*********/

/**
 * 组合组件 
 * 明智的做法是只在最顶层组件（如路由操作）里使用 Redux。
 * 其余内部组件仅仅是展示性的，所有数据都通过 props 传入。
 */
class App extends Component {
  render() {
    // Injected by connect() call:
    const { dispatch, visibleTodos, visibilityFilter } = this.props;
    /**
     * 调用AddTodo 组件 传递onAddClick方法
     * 调用TodoList组件 传递todos集合 onTodoClick方法 onTodoDel方法
     * 调用Footer组件 传递filter属性 onFilterChange方法
     * @param  {[type]} text [description]
     * @return {[type]}      [description]
     */
    return (
      <div>
        <AddTodo
          onAddClick={text =>{
            dispatch(addTodo(text))
          }} />
        <TodoList
          todos={visibleTodos}
          onTodoClick={index =>
            dispatch(completeTodo(index))
          } onTodoDel={index=>
            dispatch(delTodo(index))
          } />
        <Footer
          filter={visibilityFilter}
          onFilterChange={nextFilter =>
            dispatch(setVisibilityFilter(nextFilter))
          } />
      </div>
    )
  }
}

App.propTypes = {
  visibleTodos: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
  }).isRequired).isRequired,
  visibilityFilter: PropTypes.oneOf([
    'SHOW_ALL',
    'SHOW_COMPLETED',
    'SHOW_ACTIVE'
  ]).isRequired
}

/**
 * 根据filter过滤列表
 * @param  {[type]} todos  [description]
 * @param  {[type]} filter [description]
 * @return {[type]}        [description]
 */
function selectTodos(todos, filter) {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(todo => todo.completed)
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(todo => !todo.completed)
  }
}

// 基于全局 state ，哪些是我们想注入的 props ?
// 把state.todos 获取到然后过滤成我们想要的数据,转换成visibleTodos
// 注意：使用 https://github.com/reactjs/reselect 效果更佳
function select(state) {
  return {
    visibleTodos: selectTodos(state.todos, state.visibilityFilter),
    visibilityFilter: state.visibilityFilter
  }
}

// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(App) 中；
export default connect(select)(App)