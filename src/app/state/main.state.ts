import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { patch, removeItem, updateItem } from '@ngxs/store/operators';
import { tap } from 'rxjs/operators';
import { FileService } from '../file.service';
import { DataActions } from './../actions/data.actions';
import { Trainee } from './../models/trainee.model';


export class TraineeStateModel {
  trainees: Trainee[];
}

@State<TraineeStateModel>({
  name: 'trainee',
  defaults: {
    trainees: []
  }
})
@Injectable()
export class TraineeState {

  constructor(private fileService: FileService) { }

  @Selector()
  static getTrainees(state: TraineeStateModel) {
    return state.trainees;
  }

  @Selector()
  static getTrainee(state: TraineeStateModel) {
    return (id: number) => {
      return state.trainees.filter(trainee => trainee.id === id);
    };
  }

  // Section 5
  @Action(DataActions.LoadTrainee)
  load({ getState, patchState }: StateContext<TraineeStateModel>) {
    return this.fileService.getTraineesFromFile().pipe(
      tap(response => {
        patchState({
          trainees: response
        });
      })
    );
  }

  @Action(DataActions.AddTrainee)
  add({ getState, patchState }: StateContext<TraineeStateModel>, { payload }: DataActions.AddTrainee) {
    const state = getState();
    patchState({
      trainees: [...state.trainees, payload]
    });
  }

  @Action(DataActions.RemoveTrainee)
  remove(ctx: StateContext<TraineeStateModel>, { payload }: DataActions.RemoveTrainee) {
    ctx.setState(patch({
      trainees: removeItem<Trainee>(trainee => trainee.id === payload)
    }));
  }

  @Action(DataActions.UpdateTrainee)
  update(ctx: StateContext<TraineeStateModel>, { payload }: DataActions.UpdateTrainee) {
    ctx.setState(patch({
      trainees: updateItem<Trainee>(trainee => trainee.id === payload.id, payload)
    }));
  }
}
