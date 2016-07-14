import Rx from 'rx';
import test from 'ava';

import { createComponentStream } from '../dist';

test('component stream should combine state from observable with props', t => {
  const stateSubject = new Rx.Subject();
  const testProps = { foo: 1, bar: 2 };
  const testState = { baz: 3, quz: 4};
  const render = (props) => {
    t.falsy([...Object.keys(testState), ...Object.keys(testProps)].find(key => (
      !(key in props)
    )));
  };
  const stream = createComponentStream(stateSubject, render)(testProps);

  stream.subscribeOnError(err => t.fail(err));

  t.plan(1);

  stateSubject.onNext(testState);
});

test('component stream should emit return value of render', t => {
  const stateSubject = new Rx.Subject();
  const testProps = {};
  const testState = {};
  const testVdom = {};
  const render = (props) => {
    return testVdom;
  };
  const stream = createComponentStream(stateSubject, render)(testProps);

  stream.subscribe(vdom => t.is(vdom, testVdom), err => t.fail(err));

  t.plan(1);

  stateSubject.onNext(testState);
});
