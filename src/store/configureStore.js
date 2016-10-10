import { createStore } from 'redux';
import todoApp from '../reducers';
import * as actionCreators from '../actions';

/**
 * 创建store
 * @param  {[type]} initialState [description]
 * @return {[type]}              [description]
 */
export default function configureStore(initialState) {
  const store = createStore(todoApp, initialState,
    //redux调试代码
    window.devToolsExtension && window.devToolsExtension({ actionCreators })
  );

  //热加载,及时跟新reducer
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}