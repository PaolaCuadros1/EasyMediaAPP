import {
    Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges
} from '@angular/core'

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() nPages: number = 1
  @Input() currentPage: number = 1
  @Output() prev = new EventEmitter()
  @Output() next = new EventEmitter()
  @Output() select = new EventEmitter()

  pages: number[] = []

  constructor() { }

  ngOnInit(): void {
    this.calculatePages()
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes ', changes)
    if (changes && changes['nPages']) {
      this.calculatePages()
    }
  }

  calculatePages() {
    this.pages = new Array(this.nPages)
  }

  selectPage(page: number) {
    if (page >= 1 && page <= this.nPages && this.select && this.select.emit) {
      this.select.emit(page)
    }
  }

  prevPage () {
    if (this.currentPage > 1 && this.prev && this.prev.emit) {
      this.prev.emit(this.currentPage-1)
    }
  }

  nextPage () {
    if (this.currentPage < this.nPages && this.next && this.next.emit) {
      this.next.emit(this.currentPage+1)
    }
  }
}
