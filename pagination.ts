/* *********************************
 *          Dursun Katar           *
 *         dursunkatar.com         *
 *       github.com/dursunkatar    *
 *                                 *
 ***********************************/

class PaginationConfig {
    public Url: string;
    public ParentDivId: string;
    public ArrowLeftHtml: string;
    public ArrowRightHtml: string;
    public TotalItemCount: number;
    public PageShowItemSize: number;
    public MaxShowButtonSize: number;
}

class Pagination {
    private pageButtonCount: number;
    private addLeftRightButtonCount: number;
    private pageButtons: number[] = [];
    private currentPageIndex: number;

    constructor(private config: PaginationConfig) {
        this.init();
    }

    private init(): void {
        this.pageButtonCount = Math.ceil(this.config.TotalItemCount / this.config.PageShowItemSize);
        this.config.MaxShowButtonSize = this.config.MaxShowButtonSize > this.pageButtonCount ? this.pageButtonCount : this.config.MaxShowButtonSize;
        this.addLeftRightButtonCount = Math.ceil((this.config.MaxShowButtonSize - 1) / 2);
    }
    public static SetConfig(configCallBack: (config: PaginationConfig) => void): Pagination {
        const config = new PaginationConfig();
        configCallBack(config);
        const pagination = new Pagination(config);
        return pagination;
    }
    public Invoke(pageIndex: number = 1) {
        this.currentPageIndex = pageIndex;
        const leftRsidual = pageIndex - this.addLeftRightButtonCount;
        this.addLeftButtonNumbers(pageIndex);

        if (this.pageButtonCount - pageIndex < this.addLeftRightButtonCount) {
            this.addRightRsidualPageNumber(pageIndex);
        }
        this.pageButtons.push(pageIndex);

        for (var i = leftRsidual; i < 1; i++) {
            this.pageButtons.push(++pageIndex);
        }

        this.addRigtButtonBumbers(pageIndex);
        this.build(this.pageButtons);
    }
    private build(arr: number[]): void {
        const url = this.config.Url;
        const parent = document.getElementById(this.config.ParentDivId);
        if (this.currentPageIndex > 1) {
            parent.insertAdjacentHTML('beforeend', this.config.ArrowLeftHtml.replace('{0}', `${url}${this.currentPageIndex - 1}`));
        }
        for (const pageIndex of arr) {
            parent.insertAdjacentHTML('beforeend', `<a class="${this.currentPageIndex === pageIndex ? 'active' : ''}" href="${url}${pageIndex}">${pageIndex}</a>`);
        }
        if (this.currentPageIndex + 1 < this.pageButtonCount) {
            parent.insertAdjacentHTML('beforeend', this.config.ArrowRightHtml.replace('{0}', `${url}${this.currentPageIndex + 1}`));
        }
    }
    private addRightRsidualPageNumber(pageIndex: number): void {
        const rightRsidual = this.addLeftRightButtonCount - (this.pageButtonCount - pageIndex);
        let firstNumber = this.pageButtons[0];
        for (var i = 0; i < rightRsidual; i++) {
            if (--firstNumber === 0) {
                return;
            }
            this.pageButtons.unshift(firstNumber);
        }
    }
    private addRigtButtonBumbers(pageIndex: number): void {
        for (var i = 0; i < this.addLeftRightButtonCount; i++) {
            if (++pageIndex > this.pageButtonCount) {
                return;
            }
            console.log(`pageIndex=${pageIndex}`);
            this.pageButtons.push(pageIndex);
        }
    }
    private addLeftButtonNumbers(pageIndex: number): void {
        const arr: number[] = [];
        for (var i = 0; i < this.addLeftRightButtonCount; i++) {
            if (--pageIndex === 0) {
                break;
            }
            arr.push(pageIndex);
        }
        arr.reverse();
        this.pageButtons = this.pageButtons.concat(arr);
    }
}

