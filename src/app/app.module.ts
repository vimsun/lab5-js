import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';

import { StocksComponent } from './stocks/stocks.component';
import { StocksDataService } from './stocks/services/stocks-data.service';
import { EditStockDialogComponent } from './stocks/dialogs/edit-stock/edit-stock.dialog.component';
import { DeleteStockDialogComponent } from './stocks/dialogs/delete-stock/delete-stock.dialog.component';
import { AddStockDialogComponent } from './stocks/dialogs/add-stock/add-stock.dialog.component';

import { BrokersComponent } from './brokers/brokers.component';
import { BrokersDataService } from './brokers/services/brokers-data.service';
import { AddBrokerDialogComponent } from './brokers/dialogs/add-broker/add-broker.dialog.component';
import { EditBrokerDialogComponent } from './brokers/dialogs/edit-broker/edit-broker.dialog.component';
import { DeleteBrokerDialogComponent } from './brokers/dialogs/delete-broker/delete-broker.dialog.component';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { ExchangeComponent } from './exchange/exchange.component';



@NgModule({
  declarations: [
    AppComponent,
    StocksComponent,
    AddStockDialogComponent,
    EditStockDialogComponent,
    DeleteStockDialogComponent,
    AddBrokerDialogComponent,
    EditBrokerDialogComponent,
    DeleteBrokerDialogComponent,
    BrokersComponent,
    ExchangeComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    DateInputsModule,
  ],
  entryComponents: [
    AddStockDialogComponent,
    EditStockDialogComponent,
    DeleteStockDialogComponent,
    AddBrokerDialogComponent,
    EditBrokerDialogComponent,
    DeleteBrokerDialogComponent
  ],
  providers: [
    StocksDataService,
    BrokersDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
