import Rx from 'rx';

export const createComponentStream = (stateNode, render) => {
  return (props, children) => {
    let propsObservable;
    if (stateNode && typeof stateNode.asObservable === 'function') {
      propsObservable = stateNode.asObservable()
        .map(state => Object.assign({}, state, props));
    } else {
      propsObservable = Rx.Observable.just(props);
    }
    return propsObservable.map(props => (
      render(props, children)
    ));
  };
};
