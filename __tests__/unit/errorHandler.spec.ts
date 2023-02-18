import { errorHandler } from "../../src";
import { HttpStatusCode } from "../../src/libs/enums/httpStatus";
import { request, mockResponse } from "../utils/httpMock";

describe("errorHandler", () => {
  const res = mockResponse();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return default response body if error has no status code, message and error name", async () => {
    errorHandler({}, request, res, () => {});

    expect(res.status).toBeDefined();
    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(HttpStatusCode.INTERNAL_SERVER);
    expect(res.send).toBeDefined();
    expect(res.send).toBeCalledTimes(1);
    expect(res.send).toHaveBeenCalledWith({
      statusCode: HttpStatusCode.INTERNAL_SERVER,
      error: {
        statusCode: HttpStatusCode.INTERNAL_SERVER,
        error: "HttpExecption",
        message: "Something went wrong",
      },
      data: null,
    });
  });
});