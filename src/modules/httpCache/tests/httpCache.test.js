import pendingRequest from "../index";
import { getCacheKey } from "../httpCache.common";
import { CACHE_TIMEOUT } from "../httpCache.constants";

const {
  reducer,
  actions: { addRequestToCache, deleteRequestFromCache },
  selectors: { tryToFindRequestInCache },
  constants: { STATE_NAME }
} = pendingRequest;

beforeEach(() => {
  Date.now = jest.fn();
});

afterEach(() => Date.now.mockRestore());

describe("Given we have no cached request", () => {
  it("When we add a new request Then its added to new state", () => {
    const expectedUrl = "expectedUrl";
    const expectedMethod = "expectedMethod";
    const expectedExpirtationTime = "expectedExpirtationTime";

    Date.now.mockReturnValue(expectedExpirtationTime);

    const config = { url: expectedUrl, httpMethod: expectedMethod };

    expect(reducer(null, addRequestToCache(config))).toEqual({
      [getCacheKey(config)]: {
        createdAt: expectedExpirtationTime
      }
    });
  });
});

describe("Given we have cached request", () => {
  it("When we add a new request to the cache Then its added to new state", () => {
    const dummy1 = getDummyCacheData(1);
    const dummy2 = getDummyCacheData(2);
    const expected3 = getDummyCacheData(3);

    Date.now.mockReturnValue(expected3.expectedExpirtationTime);

    expect(
      reducer(
        {
          [getCacheKey(dummy1)]: {
            createdAt: dummy1.expectedExpirtationTime,
            ...dummy1.config
          },
          [getCacheKey(dummy2)]: {
            createdAt: dummy2.expectedExpirtationTime,
            ...dummy2.config
          }
        },
        addRequestToCache(expected3)
      )
    ).toEqual({
      [getCacheKey(dummy1)]: {
        createdAt: dummy1.expectedExpirtationTime,
        ...dummy1.config
      },
      [getCacheKey(dummy2)]: {
        createdAt: dummy2.expectedExpirtationTime,
        ...dummy2.config
      },
      [getCacheKey(expected3)]: {
        createdAt: expected3.expectedExpirtationTime,
        ...expected3.config
      }
    });
  });

  it("When we call deleteRequestFromCache and pass the url and httpMethod of a cached request Then its removed from new state", () => {
    const dummy1 = getDummyCacheData(1);
    const dummy2 = getDummyCacheData(2);
    const dummy3 = getDummyCacheData(3);

    expect(
      reducer(
        {
          [getCacheKey(dummy1)]: {
            createdAt: dummy1.expectedExpirtationTime,
            ...dummy1.config
          },
          [getCacheKey(dummy2)]: {
            createdAt: dummy2.expectedExpirtationTime,
            ...dummy2.config
          },
          [getCacheKey(dummy3)]: {
            createdAt: dummy3.expectedExpirtationTime,
            ...dummy3.config
          }
        },
        deleteRequestFromCache(dummy2)
      )
    ).toEqual({
      [getCacheKey(dummy1)]: {
        createdAt: dummy1.expectedExpirtationTime,
        ...dummy1.config
      },
      [getCacheKey(dummy3)]: {
        createdAt: dummy3.expectedExpirtationTime,
        ...dummy3.config
      }
    });
  });

  it("When we call deleteRequestFromCache and pass patterns with regexs to delete of multiple cached request Then all related request are removed from new state", () => {
    const dummy1 = getDummyCacheData(1);
    const dummy2 = getDummyCacheData(2);
    const dummy3 = getDummyCacheData(3);

    expect(
      reducer(
        {
          [getCacheKey(dummy1)]: {
            createdAt: dummy1.expectedExpirtationTime,
            ...dummy1.config
          },
          [getCacheKey(dummy2)]: {
            createdAt: dummy2.expectedExpirtationTime,
            ...dummy2.config
          },
          [getCacheKey(dummy3)]: {
            createdAt: dummy3.expectedExpirtationTime,
            ...dummy3.config
          }
        },
        deleteRequestFromCache({ patterns: [/1/, /2/] })
      )
    ).toEqual({
      [getCacheKey(dummy3)]: {
        createdAt: dummy3.expectedExpirtationTime,
        ...dummy3.config
      }
    });
  });
});

describe("Given we have cached requested ", () => {
  it("Then calling tryToFindRequestInCache with a url and httpMethod that is in cache returns the correct request", () => {
    const dummy1 = getDummyCacheData(1);
    const dummy2 = getDummyCacheData(2);
    const dummy3 = getDummyCacheData(3);

    const cachedRequests = {
      [getCacheKey(dummy1)]: {
        createdAt: dummy1.expectedExpirtationTime,
        ...dummy1.config
      },
      [getCacheKey(dummy2)]: {
        createdAt: dummy2.expectedExpirtationTime,
        ...dummy2.config
      },
      [getCacheKey(dummy3)]: {
        createdAt: dummy3.expectedExpirtationTime,
        ...dummy3.config
      }
    };

    expect(
      tryToFindRequestInCache(
        { [STATE_NAME]: cachedRequests },
        dummy1.url,
        dummy1.httpMethod
      )
    ).toEqual({
      createdAt: dummy1.expectedExpirtationTime,
      ...dummy1.config
    });
  });

  it("Then calling tryToFindRequestInCache with a url and httpMethod that is in cache whose TIME IS EXPIRED returns null", () => {
    const dummy1 = getDummyCacheData(1);
    const dummy2 = getDummyCacheData(2);

    let cachedRequests = {
      [getCacheKey(dummy1)]: {
        createdAt: dummy1.expectedExpirtationTime,
        ...dummy1.config
      },
      [getCacheKey(dummy2)]: {
        createdAt: dummy2.expectedExpirtationTime,
        ...dummy2.config
      }
    };

    const expirationTime = 1532009640017;

    const dummy3 = getDummyCacheData(3);

    Date.now
      .mockReturnValueOnce(expirationTime)
      .mockReturnValueOnce(expirationTime + CACHE_TIMEOUT + 1000);

    cachedRequests = reducer(cachedRequests, addRequestToCache(dummy3));

    expect(
      tryToFindRequestInCache(
        { [STATE_NAME]: cachedRequests },
        dummy3.url,
        dummy3.httpMethod
      )
    ).toBe(false);
  });

  describe("Then calling tryToFindRequestInCache with a url", () => {
    const tryAndGetPostOrPutFromCache = (dummy, body) => {
      const dummy1 = getDummyCacheData(1);
      const dummy2 = getDummyCacheData(2);

      let cachedRequests = {
        [getCacheKey(dummy1)]: {
          createdAt: dummy1.expectedExpirtationTime,
          ...dummy1.config
        },
        [getCacheKey(dummy2)]: {
          createdAt: dummy2.expectedExpirtationTime,
          ...dummy2.config
        }
      };

      Date.now.mockReturnValue(dummy.expectedExpirtationTime);

      cachedRequests = reducer(cachedRequests, addRequestToCache(dummy));

      return tryToFindRequestInCache(
        { [STATE_NAME]: cachedRequests },
        dummy.url,
        dummy.httpMethod,
        body || dummy.config.body
      );
    };

    it(" and httpMethod put and body that is in cache returns the correct request", () => {
      const dummy = getDummyCacheData(3);
      dummy.httpMethod = "put";
      dummy.config.body = {
        foo: "bar"
      };

      expect(tryAndGetPostOrPutFromCache(dummy)).toEqual({
        createdAt: dummy.expectedExpirtationTime,
        ...dummy.config
      });
    });

    it(" and httpMethod post and body that is in cache returns the correct request", () => {
      const dummy = getDummyCacheData(3);
      dummy.httpMethod = "post";
      dummy.config.body = {
        foo: "bar"
      };

      expect(tryAndGetPostOrPutFromCache(dummy)).toEqual({
        createdAt: dummy.expectedExpirtationTime,
        ...dummy.config
      });
    });

    it(" and httpMethod put and body that is NOT in cache returns undefined", () => {
      const dummy = getDummyCacheData(3);
      dummy.httpMethod = "put";
      dummy.config.body = {
        foo: "bar"
      };

      expect(
        tryAndGetPostOrPutFromCache(dummy, {
          foo: "baz"
        })
      ).toBe(false);
    });

    it(" and httpMethod post and body that is NOT in cache returns undefined", () => {
      const dummy = getDummyCacheData(3);
      dummy.httpMethod = "post";
      dummy.config.body = {
        foo: "bar"
      };

      expect(
        tryAndGetPostOrPutFromCache(dummy, {
          foo: "baz"
        })
      ).toBe(false);
    });
  });

  it("Then calling getRequest with an actionType that is not pending returns undefined", () => {
    const dummy1 = getDummyCacheData(1);
    const dummy2 = getDummyCacheData(2);
    const dummy3 = getDummyCacheData(3);

    const cachedRequests = {
      [getCacheKey(dummy1)]: {
        createdAt: dummy1.expectedExpirtationTime,
        ...dummy1.config
      },
      [getCacheKey(dummy2)]: {
        createdAt: dummy2.expectedExpirtationTime,
        ...dummy2.config
      },
      [getCacheKey(dummy3)]: {
        createdAt: dummy3.expectedExpirtationTime,
        ...dummy3.config
      }
    };

    expect(
      tryToFindRequestInCache(
        { [STATE_NAME]: cachedRequests },
        "notInCacheUrl",
        "notInCacheMethod"
      )
    ).toBe(undefined);
  });
});

function getDummyCacheData(index) {
  const expectedUrl = "expectedUrl" + index;
  const expectedMethod = "expectedMethod" + index;
  const expectedExpirtationTime = "expectedExpirtationTime" + index;
  const config = {
    foo: "foo" + index
  };

  return {
    url: expectedUrl,
    httpMethod: expectedMethod,
    expectedExpirtationTime,
    config
  };
}
