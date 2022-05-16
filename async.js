const fs = require('fs');

// traditional callbacks

fs.readFile('./async.js', (err, data) => {
  if (err) {
    console.error(err);
    process.exit(1);
  } else {
    doSomethingWithData(data);
  }
});

// promises

fs.promises.readFile('./async.js').then(doSomethingWithData).catch(e => {
  console.error(e);
  process.exit(1);
});

// async/await

async function getFile() {
  try {
    const data = await fs.promises.readFile('./async.js');
    doSomethingWithData(data);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

////////////////////////////////////////////////////////////////

// fetch

fetch('/api/my/api/url/123').then(res => {
  if (!res.ok) {
    throw new Error('Error during request');
  }

  return res.json();
}).then(doSomethingWithJSON).catch(doSomethingWithError);

// async/await fetch

async function getJSON() {
  const res = await fetch('/api/my/api/url/123');

  if (!res.ok) {
    return doSomethingWithError(new Error('Error during request'));
  }

  const json = await res.json();

  doSomethingWithJSON(json);
}

// traditional request -- don't do this, just showing how far things have come

function fetchGetOld(url) {
  const request = new XMLHttpRequest();

  request.addEventListener('load', function() {
    doSomethingWithJSON(JSON.parse(this.responseText));
  });

  request.open('GET', url);
  request.send();
}

//////////////////////////////////////////////////////////////////////

// utilities

Promise.resolve(value); // immediately resolves a promise with a value
Promise.reject(error); // immediately rejects a promise with a value

Promise.all([promise1, promise2]); // resolves with an ordered array of responses when all promises passed are resolved
Promise.allSettled([promise1, promise2]); // resolves with an ordered array of the resolved OR rejected values of each promise

Promise.any([promise1, promise2]); // resolves with the value of this first promise to resolve, i.e. whichever promise is faster
Promise.race([promise1, promise2]); // resolves with the value of this first promise to resolve OR reject, i.e. whichever promise is faster
