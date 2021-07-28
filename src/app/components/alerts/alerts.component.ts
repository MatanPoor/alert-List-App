import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { alertListModel } from 'src/app/core/models/alert-list.model';
import { Router } from '@angular/router';
import { CounterService } from 'src/app/core/services/counter.service';


@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {
  items$!: Promise<alertListModel[]>;
  constructor(private dataService: DataService , private router:Router) { }

  async ngOnInit(): Promise<void> {
    this.items$ = this.dataService.getAlertLists();
  }
  deleteItem(item:alertListModel) {
    this.dataService.deleteList(item);
   
    this.router.navigate(['alerts'])
    .then(() => {
      window.location.reload();
    });
   
  }
 
}
 



