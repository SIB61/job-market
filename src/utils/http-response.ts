type propType = {
    statusCode?: number,
    result: any,
    message?: string
}

export class HttpResponse {
    statusCode: number
    result: any
    message: string
    constructor({ statusCode = 200, result, message = "OK" }: propType) {
        this.statusCode = statusCode
        this.result = result
        this.message = message
    }
}