export class Paging {
    readonly page: number
    readonly page_size: number
    readonly total: number
    readonly current_page: number


    constructor(page: number, page_size: number, current_page: number, total: number) {

        this.current_page = current_page
        this.page = page
        this.page_size = page_size
        this.total = total

    }
}