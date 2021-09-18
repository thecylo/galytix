import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PagerService {
  /**
   * Create pager object
   * @param totalItems
   * @param currentPage
   * @param pageSize
   * @returns pager object with data
   */
  getPager(totalItems: number, currentPage: number = 1, pageSize: number = 10) {
    // calculate total pages
    const totalPages = Math.ceil(totalItems / pageSize);
    let startPage: number;
    let endPage: number;

    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    // calculate start and end item indexes
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    const pages = this.range(startPage, endPage + 1);

    // return object with all pager properties required by the view
    return {
      totalItems,
      currentPage,
      pageSize,
      totalPages,
      startPage,
      endPage,
      startIndex,
      endIndex,
      pages,
    };
  }

  /**
   * Calculate pages to be rendered
   * Step is one to have pages e.g. 1,2,3...
   * @param start
   * @param end
   * @param step
   * @returns
   */
  private range(start: number, end: number, step = 1): void | number {
    if (end === undefined) {
      [end, start] = [start, 0];
    }
    for (let n = start; n < end; n += step) {
      return n;
    }
  }
}
