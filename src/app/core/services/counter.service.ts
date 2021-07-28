import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class CounterService implements OnInit {

    value: number = 0;
    counter$ = new BehaviorSubject<number>(this.value);
    count$! : Promise<number>;
    constructor(private data: DataService) {}
    
    async ngOnInit(): Promise<void> {
       this.count$ =  this.data.countrAlertLists();
    }

    increment() {
      this.value++;
      this.counter$.next(this.value);
    }

    decrement() {
        this.value--;
        this.counter$.next(this.value);
      }
  
    getValue(): Observable<number> {
      return this.counter$.asObservable();
    }


}