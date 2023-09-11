export interface PageModel {
    count: number;
    next: string;
    previus: string;
    results: Array<PageResultModel>;

}

export interface PageResultModel {
    name: string;
    url: string;
}