import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Thesis } from './thesis.model';

@Injectable({
  providedIn: 'root'
})
export class ThesisService {
  selectedThesis: Thesis;
  theses: Thesis[];
  readonly baseURL = 'http://localhost:3000/thesis';

  constructor(private http: HttpClient) { }

  postThesis(ths: Thesis) {
    return this.http.post(this.baseURL, ths);
  }

  getThesisList() {
    return this.http.get(this.baseURL);
  }

  putThesis(ths: Thesis) {
    return this.http.put(this.baseURL + `/${ths._id}`, ths);
  }

  deleteThesis(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }
}
