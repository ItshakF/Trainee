import { Trainee } from '../models/trainee.model';

// tslint:disable-next-line: no-namespace
export namespace DataActions {
  export class LoadTrainee {
    static readonly type = '[Data] Load Trainees';
  }

  export class AddTrainee {
    static readonly type = '[Data] Add Trainee';
    constructor( public payload: Trainee) { }
  }

  export class RemoveTrainee {
    static readonly type = '[Data] Remove Trainee';
    constructor(public payload: number) { }
  }

  export class UpdateTrainee {
    static readonly type = '[Data] Update Trainee ';
    constructor(public payload: Trainee) { }
  }
}
