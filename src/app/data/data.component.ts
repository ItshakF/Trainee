import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FileService } from '../file.service';
import { DataTrainee } from '../models/data-trainee.model';
import { Trainee } from '../models/trainee.model';
import { TraineeState } from '../state/main.state';
import { DataActions } from './../actions/data.actions';


@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.less']
})
export class DataComponent implements OnInit {

  columnDefs = [
    { field: 'id', width: 115 },
    { field: 'name', width: 115 },
    { field: 'date', width: 115 },
    { field: 'grade', width: 115 },
    { field: 'subject', width: 115 }
  ];

  columnDefs2 = [
    { field: 'details', width: 80},
    { field: 'data', width: 145, editable: true},
  ];

  rowData = [];

  trains: DataTrainee[];
  rowSelection;
  private gridApi;
  private gridColumnApi;
  private gridApiDetails;
  private gridColumnApiDetails;
  private defaultColDef;
  currentTrainee: Observable<Trainee>;
  isDisabled: boolean;
  isUpdate: boolean;
  params: any;

  constructor(private store: Store, private fileService: FileService) {
    this.isDisabled = true;
    this.isUpdate = true;
    this.rowSelection = 'single';
    this.defaultColDef = {
      flex: 1,
      minWidth: 100,
    };
   }

  ngOnInit(): void {
    this.fetchTrainees();
    this.ObservableConverter();
    this.store.select(state => {
      console.log(state.trainee.trainees);
    });
  }

  onSelectionChanged(component) {
    const selectedRows = this.gridApi.getSelectedRows();
    this.store.select(TraineeState.getTrainee).pipe(map(filterId => filterId(selectedRows[0].id)[0])).subscribe(data => {
      this.rowData = [];
      console.log('during sub');
      Object.entries(data).map(detail => {
        this.rowData.push({ details: detail[0], data: detail[1] });
      });
      console.log(this.rowData);
    });
    this.isDisabled = false;
  }

  onGridReady(params) {
    this.params = params;
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  onGridReadyDetails(params) {
    this.gridApiDetails = params.api;
    this.gridColumnApiDetails = params.columnApi;
  }

  fetchTrainees() {
    this.store.dispatch(new DataActions.LoadTrainee());
  }

  ObservableConverter() {
    this.store.select(TraineeState.getTrainees)
      .subscribe(data => {
        this.trains = data.map(trainee => {
          return {
            id : trainee.id,
            name: trainee.name,
            date: trainee.date,
            grade: trainee.grade,
            subject: trainee.subject
          };
        });
      });
  }

  onDeleteRow() {
    this.store.dispatch(new DataActions.RemoveTrainee(this.rowData[0].data));
    this.isDisabled = true;
  }

  onAddRow() {
    this.isUpdate = false;
    const selectedRows = this.gridApi.getSelectedRows();
    this.store.select(TraineeState.getTrainee).pipe(map(filterId => filterId(12)[0])).subscribe(data => {
      this.rowData = [];
      Object.entries(data).map(detail => {
        this.rowData.push({ details: detail[0], data: '' });
      });
    });
  }

  onSave() {
    const allData = this.getAllRows();
    const traineeToSave: Trainee = allData.reduce((acc, cur, i) => ({ ...acc, [cur.details]: cur.data }), {});
    this.store.dispatch(new DataActions.AddTrainee(traineeToSave));
    this.rowData = [];
    this.isUpdate = true;
  }

  onUpdateTrainee() {
    const allData = this.getAllRows();
    const traineeToSave: Trainee = allData.reduce((acc, cur, i) => ({ ...acc, [cur.details]: cur.data }), {});
    this.store.dispatch(new DataActions.UpdateTrainee(traineeToSave));
  }

  getAllRows() {
    const rowData = [];
    this.gridApiDetails.forEachNode(node => rowData.push(node.data));
    return rowData;
  }

}
