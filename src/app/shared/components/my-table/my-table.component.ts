import { Component, Input, input } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Book, CustomBook } from 'src/app/shared/interfaces';
import { Column } from '../../interfaces/models/column.interface';


@Component({
  selector: 'app-my-table',
  standalone: true,
  imports: [TableModule],
  templateUrl: './my-table.component.html',
  styleUrl: './my-table.component.scss'
})
export class MyTableComponent {
  @Input() data : any[]
  @Input() cols : Column[]

  ngOnInit() {
  }
}
