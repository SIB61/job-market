export class HttpError extends Error {
  statusCode: number
  result: unknown
  constructor({ message, statusCode, result, error }: { message: string, statusCode: number, result?: unknown, error?: Error }) {
    super(message)
    this.statusCode = statusCode
    this.result = result
    this.stack = error?.stack ?? this.stack
  }
}
