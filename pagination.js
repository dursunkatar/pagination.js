/* *********************************
 *          Dursun Katar           *
 *         dursunkatar.com         *
 *       github.com/dursunkatar    *
 *           version 1.1           *
 *                                 *
 ***********************************/
var PaginationConfig = /** @class */ (function () {
    function PaginationConfig() {
    }
    return PaginationConfig;
}());
var Pagination = /** @class */ (function () {
    function Pagination(config) {
        this.config = config;
        this.pageButtons = [];
        this.init();
    }
    Pagination.prototype.init = function () {
        this.pageButtonCount = Math.ceil(this.config.TotalItemCount / this.config.PageShowItemSize);
        this.config.MaxShowButtonSize = this.config.MaxShowButtonSize > this.pageButtonCount ? this.pageButtonCount : this.config.MaxShowButtonSize;
        this.addLeftRightButtonCount = Math.ceil((this.config.MaxShowButtonSize - 1) / 2);
    };
    Pagination.SetConfig = function (configCallBack) {
        var config = new PaginationConfig();
        configCallBack(config);
        var pagination = new Pagination(config);
        return pagination;
    };
    Pagination.prototype.Invoke = function (pageIndex) {
        if (pageIndex === void 0) { pageIndex = 1; }
        this.currentPageIndex = pageIndex;
        var leftRsidual = pageIndex - this.addLeftRightButtonCount;
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
    };
    Pagination.prototype.build = function (arr) {
        var url = this.config.Url;
        var parent = document.getElementById(this.config.ParentDivId);
        console.log(this.currentPageIndex);
        if (this.currentPageIndex > 1) {
            parent.insertAdjacentHTML('beforeend', this.config.ArrowLeftHtml.replace('{0}',  (this.currentPageIndex - 1)));
        }
        for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
            var pageIndex = arr_1[_i];
            if (pageIndex)
            parent.insertAdjacentHTML('beforeend', `<a data-page="${pageIndex}" class="btn btn-${(this.currentPageIndex === pageIndex ? 'success' : 'default')}">${pageIndex}</a>`);
        }
        if (this.currentPageIndex < this.pageButtonCount) {
            parent.insertAdjacentHTML('beforeend', this.config.ArrowRightHtml.replace('{0}', (this.currentPageIndex + 1)));
        }
    };
    Pagination.prototype.addRightRsidualPageNumber = function (pageIndex) {
        var rightRsidual = this.addLeftRightButtonCount - (this.pageButtonCount - pageIndex);
        var firstNumber = this.pageButtons[0];
        for (var i = 0; i < rightRsidual; i++) {
            if (--firstNumber === 0) {
                return;
            }
            this.pageButtons.unshift(firstNumber);
        }
    };
    Pagination.prototype.addRigtButtonBumbers = function (pageIndex) {
        for (var i = 0; i < this.addLeftRightButtonCount; i++) {
            if (++pageIndex > this.pageButtonCount) {
                return;
            }
            this.pageButtons.push(pageIndex);
        }
    };
    Pagination.prototype.addLeftButtonNumbers = function (pageIndex) {
        var arr = [];
        for (var i = 0; i < this.addLeftRightButtonCount; i++) {
            if (--pageIndex === 0) {
                break;
            }
            arr.push(pageIndex);
        }
        arr.reverse();
        this.pageButtons = this.pageButtons.concat(arr);
    };
    return Pagination;
}());
