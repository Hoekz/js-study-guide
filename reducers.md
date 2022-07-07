# Reducers

A reducer is a function that takes the current state and new information and combines them into the next state.

## Type Signature (Typically)

```ts
function reducer(state: State, action: Action): State {
  /* ... */
}
```

Where `State` and `Action` can be any types.

## Simple Examples

Even mathematical operations can be thought of as reducers.

```ts
const total = (currentTotal: number, next: number): number => currentTotal + next;
const product = (currentProd: number, next: number): number => currentProd * next;

const max = (currentMax: number, next: number): number => next > currentMax ? next : currentMax;
const min = (currentMin: number, next: number): number => next < currentMin ? next : currentMin;
```

Or you can think of some array methods as reducers as well.

```ts
const map = <B, A>(output: A[], next: B) => [...output, mapper(next)];
const filter = <T>(output: T[], next: T) => test(next) ? [...output, next] : output;
```

Here's an example of a transactional object.

```ts
type ActionType = 'set' | 'delete';
interface Action {
  type: ActionType;
  key: string;
  value?: unknown;
}

const update = (object: Record<string, unknown>, action: Action) => {
  const copy = { ...object };

  switch (action.type) {
    case 'set':
      copy[action.key] = action.value;    
      return copy;
    case 'delete':
      delete copy[action.key];
      return copy;
  }
};
```

Here's an example of counting by label.

```ts
const data = [
  { valid: true, label: 'rock' },
  { valid: true, label: 'tree' },
  { valid: false, label: 'rock' },
  { valid: true, label: 'water' },
  { valid: true, label: 'rock' },
  { valid: true, label: 'rock' },
  { valid: true, label: 'water' },
  { valid: false, label: 'rock' },
  { valid: true, label: 'water' },
  { valid: true, label: 'rock' },
  { valid: false, label: 'tree' },
  { valid: true, label: 'water' },
  { valid: true, label: 'tree' },
  { valid: true, label: 'water' },
];

function countByLabelReducer(currentCount, nextItem) {
  const { label, valid } = nextItem;

  if (valid) {
    return {
      ...currentCount,
      [label]: (currentCount[label] || 0) + 1,
    };
  }

  return currentCount;
}

data.reduce(countByLabelReducer, {});
```

## Utilities

One of the benefits of using the typical reducer function signature is that it can be used with the `Array.reduce` function
to play out or replay multiple actions.

```js
const numbers = [1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1];
const max = (currentMax, next) => next > currentMax ? next : currentMax;

numbers.reduce(max, 0); // returns 6
```

This means we can create a utility to fast-forward to a desired state.

```js
function run(reducer, initialState, actions) {
  return actions.reduce(reducer, initialState);
}

// or expanded
function run(reducer, initialState, actions) {
  const state = initialState;

  for (const action of actions) {
    state = reducer(state, action);
  }

  return state;
}
```

## React Hook Example

Let's make an API hook in React using a reducer.

```js
const initialAPIState = {
  value: null,
  error: null,
  loading: true,
};

function apiReducer({ value, error, loading }, { type, payload }) {
  switch (type) {
    case 'reset':
      return initialAPIState;
    case 'start':
      return { value, error, loading: true };
    case 'success':
      return { value: payload, error: null, loading: false };
    case 'failure':
      return { value, error: payload, loading: false };
    case 'abort':
      return { value, error, loading: false };
  }
}

function useFetch(url) {
  const [state, dispatch] = useReducer(apiReducer, initialAPIState);

  useEffect(() => {
    dispatch({ type: 'start' });

    const controller = new AbortController();
    const signal = controller.signal;

    fetch(url, { signal }).then(async (res) => {
      const payload = await res.json();
      
      dispatch({ type: res.ok ? 'success' : 'failure', payload });
    });

    return controller.abort;
  }, [url]);

  return state;
}
```
