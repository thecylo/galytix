import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PagerService } from '../../service';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
})
export class PagerComponent {
  /**
   * Items per page
   */
  @Input() pageSize = 5;
  /**
   * Data to be paged
   */
  @Input() set inputData(data: any[]) {
    if (data?.length > 0) {
      this.allData = [...data];
      this.setPage(1, this.pageSize);
      this.pagerPages = [...this.preparePages()];
      this.pageSizeOptions = [...this.preparePagerOptions()];
    } else {
      this.respData = [];
    }
  }

  /**
   * Paged data
   */
  @Output() pagedData = new EventEmitter<any[]>();

  /**
   * Constructor
   * @param pagerService handles pagination itself
   */
  constructor(private pagerService: PagerService) {}
  /**
   * Holder for pagination
   */
  allData!: any[];
  /**
   * Paged data to be emited
   */
  respData!: any[];

  /**
   * Pager object
   */
  pager: any = {};
  /**
   * Paged items for data manipulation
   */
  pagedItems!: any[];
  /**
   * Pages
   */
  pagerPages = new Array<number>();
  /**
   * Page size options
   */
  pageSizeOptions!: number[];

  /**
   * Set current page
   * @param page
   * @param pageSize
   */
  setPage(page: number, pageSize: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(
      this.allData.length,
      page,
      pageSize
    );

    if (this.pager.currentPage > this.pager.totalPages) {
      this.pager.currentPage = 1;
      this.pagedItems = [...this.allData];
    } else {
      // get current page of items
      this.pagedItems = this.allData.slice(
        this.pager.startIndex,
        this.pager.endIndex + 1
      );
    }

    // pass data into table
    this.respData = [...this.pagedItems];
    this.pagedData.emit(this.respData);
  }

  /**
   * Change page size
   * @param pageSize
   */
  changePageSize(pageSize: string) {
    this.pageSize = Number(pageSize);
    this.setPage(this.pager.currentPage, Number(pageSize));
    this.pagerPages = [...this.preparePages()];
  }

  /**
   * Prepare pages for pager
   */
  private preparePages(): number[] {
    const res = [];
    for (let i = 1; i <= this.pager.totalPages; i++) {
      res.push(i);
    }
    return res;
  }

  /**
   * Prepare options
   */
  private preparePagerOptions(): number[] {
    const maxItem = this.pager.totalPages * this.pageSize;
    const res = [];
    for (let i = this.pageSize; i <= maxItem; i += this.pageSize) {
      res.push(i);
    }
    return res;
  }

  /**
   * Change current page
   * @param evnt
   */
  changePage(evnt: any) {
    this.setPage(Number(evnt.target.value), this.pageSize);
  }
}
