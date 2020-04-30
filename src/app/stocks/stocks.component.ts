import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { StocksDataService } from './services/stocks-data.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Stock } from './models/stock';
import { DataSource } from '@angular/cdk/collections';
import { AddStockDialogComponent } from './dialogs/add-stock/add-stock.dialog.component';
import { EditStockDialogComponent } from './dialogs/edit-stock/edit-stock.dialog.component';
import { DeleteStockDialogComponent } from './dialogs/delete-stock/delete-stock.dialog.component';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { isNull } from 'util';

@Component({
  selector: 'app-root',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})

export class StocksComponent implements OnInit {
  displayedColumns = ['id', 'name', 'price', 'amount', 'actions'];
  exampleDatabase: StocksDataService | null;
  dataSource: StocksDataSource | null;
  index: number;
  id: number;
  row: Stock | null;

  constructor(public httpClient: HttpClient,
              public dialog: MatDialog,
              public dataService: StocksDataService) {}

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('filter',  {static: true}) filter: ElementRef;

  ngOnInit() {
    this.loadData();
    var frequency = Number(sessionStorage.getItem('frequency'));
    frequency = !isNaN(frequency) ? frequency : 10000
    setInterval(() => this.refreshTable(), frequency);
  }

  refresh() {
    this.loadData();
  }

  addNew(stock: Stock) {
    const dialogRef = this.dialog.open(AddStockDialogComponent, {
      data: {issue: stock }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        setTimeout(() => this.refresh(), 500);
      }
    });
  }

  startEdit(i: number, id: number, name: string, price: string, amount: string) {
    this.id = id;
    this.index = i;
    console.log(this.index);
    const dialogRef = this.dialog.open(EditStockDialogComponent, {
      data: {id: id, name: name, price: price, amount: amount}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        setTimeout(() => this.refresh(), 500);
      }
    });
  }

  deleteItem(i: number, id: number, name: string, price: string, amount: string) {
    this.index = i;
    this.id = id;
    const dialogRef = this.dialog.open(DeleteStockDialogComponent, {
      data: {id: id, name: name, price: price, amount: amount}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
        this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        this.refreshTable();
      }
    });
  }

  private gaussianRand() {
    var rand = 0;
    for (var i = 0; i < 6; i += 1) {
      rand += Math.random();
    }
    return rand / 6;
  }

  private gaussianRandom(start, end) {
    return Math.floor(start + this.gaussianRand() * (end - start + 1));
  }


  private refreshTable() {
    this.exampleDatabase.data.forEach(function (item) {
          let newPrice: string = (parseFloat(item.price) + ((0.5 - Math.random()) * 10)).toFixed(4);
          if (parseFloat(newPrice) < 0) {
            newPrice = '0';
          }
          item.price = newPrice;
        });
    this.paginator._changePageSize(this.paginator.pageSize);
  }


  public loadData() {
    this.exampleDatabase = new StocksDataService(this.httpClient);
    this.dataSource = new StocksDataSource(this.exampleDatabase, this.paginator, this.sort);
    fromEvent(this.filter.nativeElement, 'keyup')
      // .debounceTime(150)
      // .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }
}

export class StocksDataSource extends DataSource<Stock> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Stock[] = [];
  renderedData: Stock[] = [];

  constructor(public _exampleDatabase: StocksDataService,
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  connect(): Observable<Stock[]> {
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.getAllStocks();


    return merge(...displayDataChanges).pipe(map( () => {
        console.log(this._exampleDatabase)
        this.filteredData = this._exampleDatabase.data.slice().filter((stock: Stock) => {
          const searchStr = (stock.id + stock.name).toLowerCase();
          return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
        });

        const sortedData = this.sortData(this.filteredData.slice());
        const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
        this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
        return this.renderedData;
      }
    ));
  }

  disconnect() {}

  sortData(data: Stock[]): Stock[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'id': [propertyA, propertyB] = [a.id, b.id]; break;
        case 'name': [propertyA, propertyB] = [a.name, b.name]; break;
        case 'surname': [propertyA, propertyB] = [a.price, b.price]; break;
        case 'email': [propertyA, propertyB] = [a.amount, b.amount]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
