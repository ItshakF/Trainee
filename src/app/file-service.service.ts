import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileServiceService {

  constructor(private httpClient: HttpClient) {
  }

  getTrainees(): Observable<any> {
    return this.httpClient.get('../assets/data/trainees.json');
  }
}
