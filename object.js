// creation
const typical = {};
const created = Object.create(null); // argument is the prototype
const zipped = Object.fromEntries([
  ['key1', 'value1'],
  ['key2', 'value2'],
]);

// iteration
for (const key in object) {
  doSomething(key, object[key]);
}

for (const key of Object.keys(object)) {
  doSomething(key, object[key]);
}

for (const value of Object.values(object)) {
  doSomethingWithValue(value);
}

for (const [key, value] of Object.entries(object)) {
  doSomething(key, value);
}

Object.entries(object).forEach(([key, value]) => doSomething(key, value));

// mutation
object.key = 'value'; // set with dot operator
object['key'] = 'value'; // set with key accessor
Object.assign(object, { key: 'value' }); // set multiple properties by copying in from another object
Object.defineProperty(object, 'key', {
  value: 'value',
}); // defines a property, allows for a LOT of control, not often used
delete object.key; // delete key
Object.freeze(object); // locks an object from being mutated, no setting, no deleting


// other
const copy = { ...object }; // shallow copy object into another
const { prop1, prop2, ...rest } = object; // destructure to extract into variables
object?.path?.to?.key; // optional chaining, swallows errors from trying to look at properties on undefined