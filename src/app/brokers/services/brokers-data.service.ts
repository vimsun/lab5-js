import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Broker} from '../models/broker';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

@Injectable()
export class BrokersDataService {
  private readonly API_URL = 'http://localhost:3004/brokers/';

  dataChange: BehaviorSubject<Broker[]> = new BehaviorSubject<Broker[]>([]);
  dialogData: any;

  constructor (private httpClient: HttpClient) {}

  get data(): Broker[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getAllBrokers(): void {
    this.httpClient.get<Broker[]>(this.API_URL).subscribe(data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
      console.log (error.name + ' ' + error.message);
      });
  }

  addBroker (broker: Broker): void {
    this.httpClient.post(this.API_URL, broker).subscribe(data => { },
      (err: HttpErrorResponse) => {
      alert('Error occurred. Details: ' + err.name + ' ' + err.message);
    });
  }

  updateBroker (broker: Broker): void {
    this.httpClient.put(this.API_URL + broker.id, broker).subscribe(data => {
        this.dialogData = broker;
      },
      (err: HttpErrorResponse) => {
        alert('Error occurred. Details: ' + err.name + ' ' + err.message);
      }
    );
  }

  deleteBroker (id: number): void {
    this.httpClient.delete(this.API_URL + id).subscribe(data => { },
      (err: HttpErrorResponse) => {
        alert('Error occurred. Details: ' + err.name + ' ' + err.message);
      }
    );
  }
}


