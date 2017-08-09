import { Component, OnInit, ViewChild } from '@angular/core';
import { Http } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';


import { Patient } from '../../shared/persistence/patient';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from '../../shared/services/patient.service';
import { NgForm,NgControl,NgModel} from '@angular/forms';


@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {
  
  @ViewChild(NgModel) searchForm:NgForm;
  pageTitle: string = 'Find a Patient';
  errorMessage: string;
  searchError:string;

  p: number = 1;//use for pagination
  patient: Patient;
  searchText:string;

  patient_results: Observable<Patient[]>;
  private patient_search_terms = new Subject<string>();

  constructor(private patientService: PatientService, private route: ActivatedRoute) { }

  search(terms: string): void {
    this.searchError = null;
    if(terms.length < 2)
      return;
    if(terms)
      this.loading = true;
    this.patient_search_terms.next(terms);
  }

  loading:boolean = false;

  ngOnInit(): void {
      this.patient_search_terms
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
       // ignore if next search term is same as previous
      .switchMap(term =>
        {  
          return term   // switch to new observable each time the term changes
        // return the http search observable
        ? this.patientService.searchPatient(term)
        // or the observable of empty patients if there was no search term
        : Observable.of(null)})
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        this.loading = false;
        return Observable.of(null);
      }).subscribe(res=>{
        this.loading = false;
        if(res.length === 0)
        {
          this.searchError = "No result found";
          this.patient_results = null;
          return;
        }
         this.searchError = null;
        this.patient_results = Observable.of(res);
      })

    
    this.searchForm.valueChanges.subscribe(data=>{
      this.searchText = data;
      if(!this.searchText || this.searchText == "")
        {
          this.clearSearch();
          return;
        }
      this.search(this.searchText);
    });
    
  }
    clearSearch():void
    {
      this.patient_results = null;
      this.loading = false;
      this.searchError = null;
      //this.searchForm.reset();
      this.searchText = "";

   //   this.patient_results = this.patientService.getPatients(10,1);
    }

    searchKeyUp(event):void{

      if(!this.searchText || this.searchText == "")
      {
        this.clearSearch();
      }
    }
}


