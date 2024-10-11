class ApiError extends Error {
  statusCode: number;
  message: string;
  data: any;
  errors: any;
  stack?: string | undefined;

  constructor(
    statusCode: number = 500,
    message: string = "Something went wrong!",
    data: any = null,
    errors: any = null,
    stack: string | undefined = undefined
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    if (data) this.data = data;
    this.errors = errors ?? null;
    if (this.stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
export default ApiError;
