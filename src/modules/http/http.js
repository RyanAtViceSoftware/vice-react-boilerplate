export default {
  get,
}

const ASYNC_DELAY = 1000;

// If stubSuccess or stubError is defined then we will fake a successful call to the
// server and return stubSuccess as the response. This allows for easily
// faking calls during development when APIs aren't ready. A warning
// will be written out for each stubbed response to help prevent forgetting
// about the stubs.
function get(url, body, { stubSuccess, stubError } = {}) {
  if (!url) {
    throw new Error('You must specify a url');
  }

  if (!body) {
    throw new Error('You must specify a body')
  }

  if (stubSuccess) {
    return new Promise(resolve =>
      setTimeout(
        () => {
          console.warn(`Stubbed service call made to url: ${url}`);
          resolve({ body: stubSuccess });
        },
        ASYNC_DELAY
      )
    );
  }

  if (stubError) {
    return new Promise((resolve, reject) =>
      setTimeout(
        () => {
          console.warn(`Stubbed service error was returned from url: ${url}`);
          reject(stubError);
        },
        ASYNC_DELAY
      )
    );
  }
}
