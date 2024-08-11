import { Paging } from "../paging/Paging"

export class ResponseSuccess {
    readonly status?: number
    readonly message?: string
    readonly data: any
    readonly paging?: Paging
    readonly code?: number

    constructor(data: any, paging?: Paging, status?: number, message?: string, code?: number) {
        this.status = status
        this.code = code || 200
        this.data = data
        this.message = message || 'success'
        this.paging = paging
    }
}

export class ResponseError {
    readonly status?: number
    readonly message?: string
    readonly code?: number

    constructor(message?: string, code?: number, status?: number) {
        this.status = status
        this.code = code || 500
        this.message = message || 'something wrong'

    }
}