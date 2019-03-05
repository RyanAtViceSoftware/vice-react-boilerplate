import _ from "lodash";

const buildFetchErrorResponse = (data, status) =>
  Promise.resolve({
    ok: false,
    status: status || 400,
    headers: {
      get: () => null,
      map: {
        "content-type": ""
      }
    },
    json: () => Promise.resolve(data)
  });

const buildFetchResponse = data =>
  Promise.resolve({
    ok: {},
    headers: {
      get: () => null,
      map: {
        "content-type": ""
      }
    },
    json: () => Promise.resolve(data)
  });

const mockFetch = (stubConfig, { calls } = {}) => {
  stubConfig.sort((a, b) => {
    const aIsArray = !!a.reduce;
    const bIsArray = !!b.reduce;

    if (!aIsArray === bIsArray) {
      return 0;
    }

    if (aIsArray) {
      return -1;
    }

    return 1;
  });

  if (!stubConfig) {
    throw new Error("stubConfig is required!");
  }

  const NOT_FOUND = -1;
  if (
    !stubConfig.length ||
    stubConfig.findIndex(
      c =>
        !c.url ||
        (!c.response && typeof c.response === "function") ||
        (!c.errorResponse && typeof c.errorResponse === "function")
    ) > NOT_FOUND
  ) {
    throw new Error(
      'You must specify at least one config as part of the stubConfig argument and each config must have a valid format. Example: [{url:"/foo", response: fooResponseGetter}]'
    );
  }

  if (calls) {
    calls.get = function(url, method) {
      return this.find(
        c =>
          ((!c.config.method && (!method || method.toLowerCase() === "get")) ||
            (c.config.method &&
              c.config.method.toLowerCase() === method.toLowerCase())) &&
          c.url.includes(url)
      );
    };

    calls.expect = function(url, method) {
      expect(!!this.get(url, method)).toBeTruthy();
    };

    calls.getBody = function(url, method) {
      const call = this.get(url, method);

      const body = _.get(call, "config.body");

      return body && JSON.parse(body);
    };
  }

  return (url, config) => {
    let foundUrl;

    const isGetOrDefault = (stubUrlConfig, curConfig) =>
      (!curConfig.method || curConfig.method.toLocaleString() === "get") &&
      (!stubUrlConfig.method || stubUrlConfig.method.toLowerCase() === "get");

    const stubMethodMatchesConfig = stubUrlConfig =>
      stubUrlConfig.method &&
      config.method &&
      config.method.toLowerCase() === stubUrlConfig.method.toLowerCase();

    const methodIsGetOrMethodsMatch = (stubUrlConfig, curConfig) =>
      isGetOrDefault(stubUrlConfig, curConfig) ||
      stubMethodMatchesConfig(stubUrlConfig);

    const urlIncludesFragments = (url, fragments) => {
      if (fragments.reduce) {
        return fragments.reduce((acc, cur) => {
          if (!acc) {
            return acc;
          }
          return url.includes(cur);
        }, true);
      }

      return url.includes(fragments);
    };

    foundUrl = stubConfig.find(
      stubUrlConfig =>
        methodIsGetOrMethodsMatch(stubUrlConfig, config) &&
        urlIncludesFragments(url, stubUrlConfig.url)
    );

    if (foundUrl) {
      if (calls && calls.length !== undefined) {
        calls.push({
          url,
          config
        });
      }

      if (foundUrl.errorResponse) {
        return buildFetchErrorResponse(
          foundUrl.response(),
          foundUrl.statusCode
        );
      } else {
        return buildFetchResponse(foundUrl.response());
      }
    }

    throw new Error(
      `There was an unexpected ajax call. Details follow... 
      url: ${url}
      method: ${config.method || "GET"} 
      config: ${JSON.stringify(config)}. 
      stubConfig: ${JSON.stringify(stubConfig)}`
    );
  };
};

export default mockFetch;
