export default class HttpApiCallError extends Error {
  public errorCode?: number;
  public data?: any;
  public status?: string;

  constructor(
    message?: string,
    status?: string,
    data?: any,
    errorCode?: number
  ) {
    super(message);
    this.status = status;
    this.data = data;
    this.errorCode = errorCode;
    this.stack = new Error().stack;
    this.name = 'HttpApiCallError';
  }
}
