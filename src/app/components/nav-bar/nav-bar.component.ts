import { Component, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { alertListModel } from 'src/app/core/models/alert-list.model';
import { CounterService } from 'src/app/core/services/counter.service';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  value$!: Promise<number>;

  constructor(private dataService: DataService) { }

  async ngOnInit(): Promise<void> {
      this.value$ = this.dataService.countrAlertLists(); 
  } 
}
