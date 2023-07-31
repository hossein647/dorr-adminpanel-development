import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { SafeHtmlPipe } from './safe-html.pipe';
import { DomSanitizer } from '@angular/platform-browser';
import { ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-table-with-paginator',
  standalone: true,
  imports: [CommonModule, TableModule, PaginatorModule, ToastModule, ConfirmDialogModule],
  providers: [ConfirmationService],
  templateUrl: './table-with-paginator.component.html',
  styleUrls: ['./table-with-paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableWithPaginatorComponent implements OnInit {

  @Input() value: any[];
  @Input() cols: any[]
  @Input() limit: number;
  @Input() page: number;
  @Input() totalDocs: number;
  @Input() totalPages: number;
  @Input() rowsPerPageOptions: number[];
  @Input() showPaginator: boolean;
  @Input() showRemoveIcon: boolean;
  @Input() showEditIcon: boolean;
  @Input() styleClass: boolean;
  @Input() messageConfirm: string;
  @Input() hedearConfirm: string;
  @Input() iconConfirm: string;


  @Output()  onChangePage = new EventEmitter<{ limit: number, page: number, totalPages: number }>();
  @Output()  onRemoveById = new EventEmitter<string>();
  @Output()  onEditById = new EventEmitter<any>();

  trashIcon = `<i class="pi pi-trash"></i>`
  editIcon = `<i class="pi pi-file-edit"></i>`

  constructor(
    private sanetizer: DomSanitizer,
    private confirmationService: ConfirmationService,
  ) {}


  ngOnInit() {}
  


  changePage(event: any) {
    this.page = event.page + 1;
    this.limit = event.rows;
    this.totalPages = event.pageCount;
    this.onChangePage.emit({limit: this.limit, page: this.page, totalPages: this.totalPages});
  }



  innerHtmlBindData(page: number, limit: number, rowData: any, col: any, rowIndex: number) {
    const realIndex = (((page * limit) - limit) + rowIndex + 1);
    return col.field === 'num' ? realIndex
          : col.field === 'remove' && this.showRemoveIcon
          ? new SafeHtmlPipe(this.sanetizer).transform(this.trashIcon)
          : col.field === 'edit' && this.showEditIcon
          ? new SafeHtmlPipe(this.sanetizer).transform(this.editIcon)
          : col.subField
          ? rowData[col.field][col.subField]
          : rowData[col.field]
  }



  onRemoveRow(rowData: any) {
    this.confirmDialog(rowData);
  }



  onEditRow(rowData: any) {
    this.onEditById.emit(rowData);
  }



  confirmDialog(rowData: any) {
    const { _id: id } = rowData

    this.confirmationService.confirm({
      message: this.messageConfirm,
      header: this.hedearConfirm,
      icon: this.iconConfirm,
      accept: () => {
        this.onRemoveById.emit(id);
      },
    });
  }
}
