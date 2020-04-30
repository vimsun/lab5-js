import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {StocksComponent} from './stocks/stocks.component';
import {BrokersComponent} from './brokers/brokers.component';
import {ExchangeComponent} from './exchange/exchange.component';

const routes: Routes = [
  { path: '', redirectTo: '/exchange', pathMatch: 'full' },
  { path: 'exchange', component: ExchangeComponent },
  { path: 'stocks', component: StocksComponent },
  { path: 'brokers', component: BrokersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
