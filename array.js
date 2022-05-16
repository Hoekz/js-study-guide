// creation
const typical = [];
const filled = Array(100).fill(0); // array of 100 zeroes

// iteration
for (let i = 0; i < array.length; i++) {
  doSomethingWithValue(value);
}

for (const value of array) {
  doSomethingWithValue(value);
}

array.forEach(doSomethingWithValue);

// mutation - []
array.push(value1, value2); // [value1, value2], returns length (2)
array.pop(); // [value1], returns value2
array.unshift(value3); // [value3, value1], returns length (2)
array.shift(); // [value1], returns value3
array.splice(0, 1, value4); // [value4], returns [value1] (new array)

// immutable
array.slice(0, 5); // returns new array with the subset of items
array.concat(1); // returns new array with the item added, like push but not mutating
array.concat([1, 2, 3]); // returns new array of all items in both arrays, like push but not mutating
array.map(n => n * 2); // returns new array of all items doubled
array.filter(n => n % 2 === 0); // returns new array of all items that are even
array.reduce((max, n) => n > max ? n : max); // returns the max item in the array
array.every(n => n % 2 == 0); // returns true if all items in the array are even
array.some(n => n % 2 == 0); // returns true if any item in the array are even
array.find(n => n % 2 == 0); // returns the first item that is even
array.join(', '); // returns string of all items in array joined with the specified string
const copy = [...array]; // copy the array into a new one via spreading
const [first, ...rest] = array; // extract first item in array and collect the rest as another array

// helpers
const unique = (array) => [...new Set(array)]; // convert the array to a set which guarantees uniqueness, then turn it back into an array

const mergeObjects = (array) => array.reduce((merged, obj) => Object.assign(merged, obj), {});

const frequency = (array) => array.reduce((frequencies, item) => {
  if (!(item in frequencies)) {
    frequencies[item] = 0;
  }

  frequencies[item]++;
  return frequencies;
}, {});

