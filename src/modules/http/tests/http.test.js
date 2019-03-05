import * as store from "../../store";
import localStorage from "localStorage";
import http from "../http";
import fetch from "cross-fetch";
import mockFetch from "../../../test/mockFetch";

const expectedHostName = "expectedHostName";

jest.mock("../../store");
jest.mock("cross-fetch");
jest.mock("../http.constants", () => ({
  API_URL: "http://expectedHostName/api"
}));

afterEach(() => {
  fileDownload.mockReset();
  axios.post.mockReset();
  fetch.mockReset();
});

describe("When we call get on a resource with a config", () => {
  it("Then we get the expected result from server", done => {
    try {
      const calls = [];
      const expectedUrl = "expectedUrl";
      const expectedResult = { result: "expectedResult" };

      fetch.mockImplementation(
        mockFetch(
          [
            {
              url: expectedUrl,
              response: () => expectedResult
            }
          ],
          { calls }
        )
      );

      store.getState.mockReturnValue({
        userContext: {}
      });

      const expectedConfig = { sampleConfig: "sample" };

      const p = http.get(expectedUrl, expectedConfig);

      setTimeout(() => {
        p.then(r => {
          expect(calls.length).toBe(1);

          expect(calls[0].url).toEqual(
            `http://${expectedHostName}/api/${expectedUrl}`
          );

          expect(calls[0].config).toEqual(expectedConfig);

          expect(r.result).toBe(expectedResult.result);
        })
          .then(() => done())
          .catch(done.fail);
      });
    } catch (e) {
      done.fail(e);
    }
  });

  it("When we get a failure response Then we get rejected promise with error", async () => {
    fetch.mockImplementation(
      mockFetch([
        {
          url: "/url",
          errorResponse: true,
          response: () => ({ error: "whoops" })
        }
      ])
    );
    store.getState.mockReturnValue({
      userContext: {}
    });

    await http
      .get("url", { sampleConfig: "sample" })
      .then(r => expect(r.result))
      .catch(e => expect(e.error).toBe("whoops"));
  });
});

describe("When we call post on a resource with a config", () => {
  it("Then we get the expected result from server and config.method set to POST", done => {
    callApiAndExpect("post", done);
  });
});

describe("When we call put on a resource with a config", () => {
  it("Then we get the expected result from server and config.method set to POST", done => {
    callApiAndExpect("put", done);
  });
});

describe("When we call axiosGet on a resource with a config", () => {
  it("Then we get the expected result from server", done => {
    try {
      const expectedUrl = "expectedUrl";
      const expectedResult = { data: "expectedResult" };

      axios.get.mockImplementation(() => Promise.resolve(expectedResult));

      store.getState.mockReturnValue({
        userContext: {}
      });

      const expectedConfig = { sampleConfig: "sample" };

      const p = http.axiosGet(expectedUrl, expectedConfig);

      setTimeout(() => {
        p.then(r => {
          expect(axios.get.mock.calls.length).toBe(1);

          expect(axios.get.mock.calls[0][0]).toEqual(
            `http://${expectedHostName}/api/${expectedUrl}`
          );

          expect(axios.get.mock.calls[0][1]).toEqual(expectedConfig);

          expect(fileDownload.mock.calls.length).toBe(1);

          expect(fileDownload.mock.calls[0][0]).toBe(expectedResult.data);

          expect(fileDownload.mock.calls[0][1]).toBe("template.xlsx");
        })
          .then(() => done())
          .catch(done.fail);
      });
    } catch (e) {
      done.fail(e);
    }
  });
});

describe("When we call axiosPost on a resource with a config", () => {
  it("Then we get the expected result from server", done => {
    try {
      const expectedUrl = "expectedUrl";
      const expectedResult = { data: "expectedResult" };

      axios.post.mockImplementation(() => Promise.resolve(expectedResult));

      store.getState.mockReturnValue({
        userContext: {}
      });

      const expectedConfig = {
        body: JSON.stringify({ sampleConfig: "sample" })
      };

      const p = http.axiosPost(expectedUrl, expectedConfig);

      setTimeout(() => {
        p.then(r => {
          expect(axios.post.mock.calls.length).toBe(1);

          expect(axios.post.mock.calls[0][0]).toEqual(
            `http://${expectedHostName}/api/${expectedUrl}`
          );

          expect(axios.post.mock.calls[0][1]).toEqual(expectedConfig.body);

          expect(fileDownload.mock.calls.length).toBe(1);

          expect(fileDownload.mock.calls[0][0]).toBe(expectedResult.data);

          expect(fileDownload.mock.calls[0][1]).toBe("Template.xlsx");
        })
          .then(() => done())
          .catch(done.fail);
      });
    } catch (e) {
      done.fail(e);
    }
  });
});

describe("When we call axiosPostFile on a resource with a config", () => {
  it("Then we get the expected result from server", done => {
    try {
      const expectedUrl = "expectedUrl";
      const expectedToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IkZha2UgVXNlciIsInVzZXJJZCI6IjAiLCJkaXN0cmlidXRvcklkIjoiNSIsImNvbXBhbnlOYW1lIjoiQnJvd24gRGlzdHJpYnV0aW5nIENvLiwgSW5jLiBGTCIsImxhc3RMb2dpbiI6IjcvMTkvMTggMTI6MzE6MzggUE0iLCJuYmYiOjE1MzIwMTgyNDEsImV4cCI6MTUzMjAxOTQ0MSwiaWF0IjoxNTMyMDE4MjQxfQ.WGqacVtaVuvaHCjHHpEpqqQ5fD-89G6TGwo6pMyiac4";
      const expectedResult = {
        data: { result: { result: "expectedResult" } },
        headers: { authorization: `Bearer ${expectedToken}` }
      };

      const expectedPostData = "expectedPostData";

      axios.post.mockImplementation(() => Promise.resolve(expectedResult));

      store.getState.mockReturnValue({
        userContext: {}
      });

      const expectedConfig = {
        body: JSON.stringify({ sampleConfig: "sample" })
      };

      const p = http.axiosPostFile(expectedUrl, {
        ...expectedConfig,
        data: expectedPostData
      });

      setTimeout(() => {
        p.then(r => {
          expect(axios.post.mock.calls.length).toBe(1);

          expect(axios.post.mock.calls[0].length).toBe(3);

          expect(axios.post.mock.calls[0][0]).toEqual(
            `http://${expectedHostName}/api/${expectedUrl}`
          );

          expect(axios.post.mock.calls[0][1]).toEqual(expectedPostData);

          expect(axios.post.mock.calls[0][2]).toEqual(expectedConfig);

          expect(localStorage.getItem("jwtToken")).toEqual(expectedToken);
        })
          .then(() => done())
          .catch(done.fail);
      });
    } catch (e) {
      done.fail(e);
    }
  });
});

function callApiAndExpect(httpMethod, done) {
  try {
    const calls = [];
    const expectedUrl = "expectedUrl";
    const expectedResult = { result: "expectedResult" };

    fetch.mockImplementation(
      mockFetch(
        [
          {
            url: expectedUrl,
            method: httpMethod.toUpperCase(),
            response: () => expectedResult
          }
        ],
        { calls }
      )
    );

    store.getState.mockReturnValue({
      userContext: {}
    });

    const expectedConfig = { sampleConfig: "sample" };

    const p = http[httpMethod](expectedUrl, expectedConfig);

    setTimeout(() => {
      p.then(r => {
        expect(calls.length).toBe(1);

        expect(calls[0].url).toEqual(
          `http://${expectedHostName}/api/${expectedUrl}`
        );

        expect(calls[0].config).toEqual({
          ...expectedConfig,
          method: httpMethod.toUpperCase()
        });

        expect(r.result).toBe(expectedResult.result);
      })
        .then(() => done())
        .catch(done.fail);
    });
  } catch (e) {
    done.fail(e);
  }
}
