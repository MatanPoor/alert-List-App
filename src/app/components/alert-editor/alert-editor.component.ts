import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl , Validators } from '@angular/forms';
import { alertListModel } from 'src/app/core/models/alert-list.model';
import { wordsValidator } from 'src/app/core/validations/general-validators';
import { DatepickerOptions } from 'ng2-datepicker'
import locale from 'date-fns/locale/en-US';
import { CounterService } from 'src/app/core/services/counter.service';


@Component({
  selector: 'app-alert-editor',
  templateUrl: './alert-editor.component.html',
  styleUrls: ['./alert-editor.component.css']
})
export class AlertEditorComponent implements OnInit {
  form!: FormGroup;
  initialList: alertListModel = {"id" : 0,"name":''  ,"description" : ''  ,"addedDate": new Date(),"startingDate" : new Date(), "endingDate" : new Date() }
  date = new Date();
  isByDate = true;

 
  
  options: DatepickerOptions = {
    minDate: this.date ,
    format: 'yyyy/MM/dd', // date format to display in input
    formatTitle: 'LLLL yyyy',
    formatDays: 'EEE',
    firstCalendarDay: 0, // 0 - Sunday, 1 - Monday
    locale: locale, // date-fns locale
    position: 'bottom',
    inputClass: 'minDate', // custom input CSS class to be applied
    calendarClass: 'datepicker-default', // custom datepicker calendar CSS class to be applied
    scrollBarColor: '#dfe3e9', // in case you customize you theme, here you define scroll bar color
  };

  constructor(private dataService : DataService , private activatedRouter:ActivatedRoute , private router:Router) {}

  async ngOnInit(): Promise<void> {
    this.buildForm()
  }
  
  setCurrentDateFromDays(){
    if (this.isByDate)
      return this.form.value.endingDate;

    var numberOfDaysToAdd = Number(this.form.value.endingDate);
    var newDt = new Date(this.form.value.startingDate)

    var someDate = newDt.getDate() + numberOfDaysToAdd ;
    newDt.setDate(someDate)
    return newDt;
  }

  choseDateOrDay(){
    this.isByDate = !this.isByDate
  }
  buildForm() {
    this.form = new FormGroup({
        name: new FormControl('', [Validators.required]), 
        description: new FormControl('', [Validators.required, wordsValidator(2,5)]), 
        startingDate: new FormControl('', [Validators.required]),
        endingDate: new FormControl('', [Validators.required])
    });
    this.form.reset(this.initialList);
  } 
  async onGo() 
  {
     //add new list
     this.activatedRouter.paramMap.subscribe(async(params)=>{
          let newList:alertListModel={
          id: this.form.value.id,
          name : this.form.value.name,
          description : this.form.value.description,
          addedDate : this.date,
          startingDate : this.form.value.startingDate,
          endingDate : this.setCurrentDateFromDays()
        }
        await this.dataService.postAlertList(newList);
     
          this.router.navigate(['alerts'])
          .then(() => {
            location.reload();
          });   
      
        
   })
  }
  get(fieldName: string){
    return this.form.get(fieldName)
  }

}
