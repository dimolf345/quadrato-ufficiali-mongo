import { AfterViewInit, Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IUfficiale } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-tabella-ufficiali',
  templateUrl: './tabella-ufficiali.component.html',
  styleUrls: ['./tabella-ufficiali.component.scss'],
})
export class TabellaUfficialiComponent implements OnChanges, AfterViewInit {



  @ViewChild(MatSort) sort: MatSort = new MatSort();

  @Input()
  ufficiali: IUfficiale[] = [];

  dataSource: MatTableDataSource<IUfficiale> = new MatTableDataSource()
  colonneUfficiali: string[] = ['grado', 'nome', 'cognome']


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['ufficiali']) {
      this.dataSource.data = changes['ufficiali'].currentValue as IUfficiale[]
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort
  }


}





