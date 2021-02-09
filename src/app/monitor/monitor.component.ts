import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngxs/store';
import { DataActions } from '../actions/data.actions';
import { MonitorTrainee } from '../models/monitor-trainee.model';
import { TraineeState } from '../state/main.state';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.less']
})
export class MonitorComponent implements OnInit {

  passed = true;
  failed = true;
  toppings = new FormControl();
  toppingList: number[] = [];

  columnDefs = [
    { field: 'id', width: 100 },
    { field: 'name', width: 150 },
    { field: 'average', width: 150 },
    { field: 'exams', width: 150 },
  ];

  rowData = [];
  showPassed: boolean;
  showFailed: boolean;
  trains: MonitorTrainee[];
  rowClassRules;
  id ;
  private gridApi;
  private gridColumnApi;

  constructor(private store: Store) {
    this.showFailed = true;
    this.showPassed = true;
    this.rowClassRules = {
      passed: (params) => params.data.average >= 65,
      failed: (params) => params.data.average < 65,
    };
    this.id = [1, 5, 8, 10];
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  ngOnInit(): void {
    this.fetchTrainees();
    this.ObservableConverter();

  }

  fetchTrainees() {
    this.store.dispatch(new DataActions.LoadTrainee());
  }

  ObservableConverter() {
    this.store.select(TraineeState.getTrainees)
      .subscribe(data => {
        const monitorTrainee = [];
        data.map(trainee => {
          const existTrainee = monitorTrainee.find(train => train.name === trainee.name);
          if (existTrainee){
            existTrainee.average += trainee.grade;
            existTrainee.exams++;
          } else {
            this.toppingList.push(trainee.id);
            monitorTrainee.push({
              id : trainee.id,
              name : trainee.name,
              average : trainee.grade,
              exams : 1
            });
          }
        });
        this.trains = monitorTrainee.map(trainee => {
          return {
            id: trainee.id,
            name: trainee.name,
            average: Math.round(trainee.average / trainee.exams),
            exams: trainee.exams,
            passed: Math.round(trainee.average / trainee.exams) > 65 ? true : false
          };
        });
        console.log(this.trains);
      });
  }

  externalFilterChanged(value) {
    // this.id = value;
    this.gridApi.onFilterChanged();
  }

  isExternalFilterPresent() {
    return this.id !== [];
  }

  doesExternalFilterPass(node){
    return this.id.find( id => id === node.data.id);
  }

}
