export default {
  get,
}

const ASYNC_DELAY = 1000;


function get({url, body, stubSuccess, stubError} = {}) {
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
          reject(new Error(stubError));
        },
        ASYNC_DELAY
      )
    );
  }
}
