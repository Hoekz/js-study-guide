# Quiz

## React

### 1 - What is JSX?

A transpiled version of JavaScript that supports writing HTML Elements as part of your code.

### 2 - What is a Component?

A reusable encapsulation of (an) element(s) in a web app.

### 3 - What is a Hook?

A React-specific function for binding data and/or effects to components.

### 4 - What is useState?

A hook for binding and updating data to a component.

### 5 - What is useReducer?

A hook for binding and updating data to a component using the reducer pattern.

### 6 - What is useEffect?

A hook for listening for changes in values and acting on that change.

### 7 - What is useContext?

A hook for referencing contextual data in any decendent of the context provider.

### 8 - What is useMemo?

A hook for saving the result of an expensive calculation so as to avoid rework.

### 9 - What is useCallback?

A hook for keeping a more stable function reference for event listeners.

### 10 - What is useRef?

A hook used to keep a reference to data that is not tracked by React.

### 11 - What is a Virtual DOM?

A lightweight representation of the real document to provide better speed and efficiency when performing updates.

## JavaScript

### 1 - What are primitives?

Values that cannot be mutated like numbers and strings.

### 2 - What is the difference between let and const?

Let can change the value it is pointing to, const cannot.

### 3 - What is an arrow function?

A function with more terse syntax that can immediately return and binds to the current context.

### 4 - What is the difference between 'in' and 'of'?

- 'in': used for keys, can iterate over all in an object/array, or can check for preference
- 'of': used for values *in an iterable* (like an array), can only iterate

### 5 - What are some of the immutable array methods and what do they do?

- slice: creates a new array from a subset of the existing array based off indexes, e.g. nums.slice(1, 5)
- map: creates a new array where each item in the existing array is transformed by a function, e.g. nums.map(double)
- filter: creates a new array where each item comes from the existing array when it passes a test, e.g. nums.filter(isEven)
- reduce: creates an aggregate value from all items in the array, extremely generic, e.g. nums.reduce(sum) or nums.reduce(max)
- every: checks whether every item in the array passes a test, e.g. nums.every(isEven)
- some: checks whether at least one item in the array passes a test, e.g. nums.some(isEven)
- find: returns the first item in the array that passes a test, e.g. nums.find(isEven)
- findIndex: returns the index of the first item in the array that passes a test, e.g. nums.findIndex(isEven) 

### 6 - What are some of the mutating array methods and what do they do?

- push: adds (an) item(s) to the end of the array
- unshift: adds an item to the start of the array
- pop: removes an item from the end of the array and returns it
- shift: removes an item from the start of the array and returns it
- splice: starting from an index, removes a specified amount of items and inserts (an) item(s) in the same location

### 7 - What are the main 3 (2-ish) ways of handling asynchronous code?

- Callbacks: passing or attaching a function to listen for when the asynchronous work is done
- Promises: Creates a structure that can be chained together with `.then` and `.catch` calls for serial asynchronous processes
- Async/Await: modern syntax to write synchronous-style code that is actually asynchronous using promises
- Bonus related libraries:
  - RXJS
  - MobX
  - axios

### 8 - How do you install and use a new package?

`npm i <package-name>` or `npm install <package-name>`
`npm i --save-dev <package-name>` if is only used in development, not production code
`require('<package-name>')` or `import ... from '<package-name>'`

### 9 - What do you need to be careful of when using a new package?

  - installing without specifying a version defaults to the latest which may have compatibility issues.
  - loose versioning such as `^1.0.0` means that a different minor version might be downloaded by someone else (using a package-lock helps with this)
  - `npm audit` will give you information about vulnerabilities in your packages, it is important to keep them up to date because of this
  - Packages are attacked all the time, with methods such as:
    - typosquatting: malicious packages are uploaded with very similar names to official packages, like `color` vs. `colors` vs. `colours` vs. `collors`
    - dependency confusion: packages seem more official than they actually are, like `yahoo-react-input` to convince someone that it is a package maintained by Yahoo
    - gaining access to the code base and pushing out minor versions that inject malicious code like password or credit card scrapers
    - the code in a linked repository is not guaranteed to match the code in the package

## NodeJS

### 1 - What code inclusion style does Node use?

CommonJS: uses the synchronous `require` function that takes a string to resolve dependencies
Now Supported:
  - ES Modules: uses the synchronous `import ... from '...'` syntax and the asynchronous `import(...)` function

### 2 - What is the standard callback function signature?

`(error, data) => void`: first argument is `null` or the error that occurred, second is `null` or the data if operation was successful.

### 3 - What are some of the built-in packages of Node?

- `fs`: access to the file system (read, write, move, etc.)
- `path`: utility for referencing file system paths agnostic to the platform (join two paths, get just the name of a file, get the extension of a file)
- `crypto`: cryptographic utilities such as hashing or pseudo-random number generation
- `http`: package for creating HTTP requests and servers, not recommended to use directly
- `os`: access to information about or from the operating system (OS version, CPU core structure and count)
- `child_process`: access to create subprocesses, including other node apps

### 4 - What are some of the global properties available in NodeJS?

- `require`: function for including other packages
- `process`: information about the current process, including:
  - `cwd`: the current working directory
  - `env`: the environment variables present when the application was started
  - `argv`: the arguments that were passed to the process, e.g. `node my-app <arg1> <arg2>`
- `Math`: the standard global math object
- `setTimeout`, `setInterval`, `setImmediate`: functions that take a call back to run after a specified amount of time
- `Buffer`: effectively a generic structure that represents an array of bytes
- `console`: standard object for sending data to the terminal, e.g. `console.log(message)`, `console.warn(error)`

## General

### 1 - What does CRUD stand for?

Create, Read, Update, Delete.

### 2 - What are some possible databases you can use?

MySQL, SQLite, PostgreSQL, MongoDB, Neo4j

### 3 - What is Git?

Git is a tool for versioning and tracking changes in code.
It can track who makes a change and when as well as keep separate versions (called branches) of code simultaneously.
There is a remote version of the code that can be pushed to and pulled from.
Each change is called a commit.
Branches can start from anywhere and be merged back in at any time.
Branches can also be rebased, which means to change the starting point of a branch while keeping the changes on it.
Git keeps 2 versions of the code on your machine, one that is your local working copy and a pure copy of the remote version, so as to better track when there will be conflicts.
If you have work you want to hold on to as you switch branches, you can use the stash.
Remote code is typically hosted on a site like GitHub, GitLab, or BitBucket, which can all be hosted independent of the their main sites as well.

### 4 - What is Docker?

Docker is a tool for running containerized software.
Allows you to runs things like a separate Linux machine on your computer.
Often used to guarantee the structure of an environment is the same everywhere you run it.
Can be used for databases, applications, isolation, configuration.
