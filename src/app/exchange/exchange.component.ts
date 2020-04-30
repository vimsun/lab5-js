import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './exchange.component.html',
    styleUrls: ['./exchange.component.css']
})


export class ExchangeComponent {
  
  public start: Date = new Date(2020, 2, 10, 12, 30);
  public end: Date = new Date(2020, 2, 15, 12, 30);
  public frequency = 1000;
  public frequencyRes = null;
  public res: any;


  options = [
    { name: "1000 ms", value: 1000 },
    { name: "5000 ms", value: 5000 },
    { name: "10000 ms", value: 10000 },
    { name: "60000 ms", value: 60000 }
  ]

  setFrequency(res) {
    this.frequency = res;
    sessionStorage.setItem('frequency', res.split(' ')[0])
    console.log(sessionStorage)
  }
}