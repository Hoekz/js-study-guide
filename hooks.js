/*
  This is a conceptual representation of what React does with hooks.
  It is over-simplified, but illustrates a few concepts:
  
  1) React will rerun your component function for you
  2) Hooks being called with trigger the rerun
  3) Order of hooks matters because of this, as they need to retrieve
     the values that React has saved off.
  4) Updates are batched together to save on work.

  You can run this file with `node hooks` in the project directory.

  Each function is set to print out what it does so you can see the
  different behavior over time. The simulated experience is an input
  field that gets updated except for if the update is 'special_value'
  and there is a counter for how many times the input has been updated.
*/

// Example Component

function MyComponent() {
  start('MyComponent');
  const [value, setValue] = useState('');
  const [total, add] = useReducer((total, n) => total + n, 0);

  useEffect(() => {
    block('custom effect running', { value, total });
  }, [value, total]);

  const output = create('div', {}, [
    create('input', { value, onChange: (newValue) => {
      if (newValue === 'special_value') {
        setValue(value);
        add(0);
      } else {
        setValue(newValue);
        add(1);
      }
    
    }}),
    create('span', {}, [total]),
  ]);

  end('MyComponent');
  return output;
}

// utilities
let indent = '';

function start(block, ...args) {
  console.log(`${indent}${block}`, ...args);
  indent += '  ';
}

function end(block) {
  indent = indent.substring(0, indent.length - 2);
  console.log(`${indent}END ${block}`);
}

function block(name, ...args) {
  console.log(`${indent}${name}`, ...args);
}

// "React" internals

function create(component, props = {}, children = []) {
  block('create', component);
  return { component, props, children };
}

let currentContext;

function mount(instance) {
  start('mount', instance.component);
  const children = instance.children.map(mount);

  if (typeof instance.component === 'string') {
    end('mount');
    return { ...instance, children };
  }

  currentContext = instance.context = instance.context ?? {
    hooks: [],
    component: instance.component,
    capture: true,
    hookIndex: 0,
    instance,
  };

  currentContext.hookIndex = 0;
  instance.value = instance.component({ ...instance.props, children });
  currentContext.capture = false;

  end('mount');
  return instance;
}

const scheduled = new WeakMap();

function schedule(fn, arg) {
  start('schedule', fn);

  if (!scheduled.has(fn)) {
    block('new function');
    scheduled.set(fn, new Set());
  }

  const fnCalls = scheduled.get(fn);

  if (fnCalls.has(arg)) {
    block('already scheduled');
    end('schedule');
    return;
  }

  block('scheduling unique call');
  fnCalls.add(arg);

  queueMicrotask(() => {
    fn(arg);
    fnCalls.delete(arg);    
  });
  end('schedule');
}

function useState(initialValue) {
  start('useState', { initialValue });
  if (!currentContext.capture) {
    const hook = currentContext.hooks[currentContext.hookIndex];
    block('getting saved value', { value: hook.pair[0] });
    currentContext.hookIndex++;

    end('useState');
    return hook.pair;
  }

  const pair = [initialValue, (newValue) => {
    const oldValue = pair[0];
    pair[0] = newValue;
    block('setState', { oldValue, newValue });

    if (oldValue !== newValue) {
      schedule(mount, currentContext.instance);
    }
  }];

  currentContext.hooks.push({ pair });

  end('useState');
  return pair;
}

function useReducer(fn, initialValue) {
  start('useReducer', { initialValue });
  if (!currentContext.capture) {
    const hook = currentContext.hooks[currentContext.hookIndex];
    block('getting saved value', { value: hook.pair[0] });
    currentContext.hookIndex++;

    end('useReducer');
    return hook.pair;
  }

  const pair = [initialValue, (...args) => {
    const newValue = fn(pair[0], ...args);
    const oldValue = pair[0];
    pair[0] = newValue;
    block('runReducer', { oldValue, newValue });

    if (oldValue !== newValue) {
      schedule(mount, currentContext.instance);
    }
  }];

  currentContext.hooks.push({ pair });

  end('useReducer');
  return pair;
}

function useEffect(effect, dependencies) {
  start('useEffect', { effect });
  if (!currentContext.capture) {
    const hook = currentContext.hooks[currentContext.hookIndex];
    block('retreiving saved effect', hook.effect);
    currentContext.hookIndex++;

    if (!hook.dependencies.every((dependency, i) => dependency === dependencies[i])) {
      block('run cleanup', hook.cleanup);
      hook.cleanup && hook.cleanup();
      schedule(() => hook.cleanup = effect());
    }

    end('useEffect');
    return;
  }

  const hook = { effect, dependencies };

  schedule(() => hook.cleanup = effect());

  currentContext.hooks.push(hook);
  end('useEffect');
}

// Example "mounting" of component and interaction

function pause(message) {
  return new Promise(res => {
    setTimeout(() => {
      console.log('--------------------------------------');
      console.log(message);
      console.log('--------------------------------------');
      res();
    }, 1000)
  });
}

async function example() {
  await pause('mounting MyComponent');
  const dom = mount(create(MyComponent));
  await pause('updating input to change');
  dom.value.children[0].props.onChange('change');
  await pause('updating input to new_change');
  dom.value.children[0].props.onChange('new_change');
  await pause('updating counter only');
  dom.value.children[0].props.onChange('new_change');
  await pause('updating neither input or counter');
  dom.value.children[0].props.onChange('special_value');
  await pause('done');
}

example();
