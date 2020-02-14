import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Equipment } from './equipment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  endpoint: string = 'http://localhost:4000/api/equipment';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  //currentUser = {};

  constructor(
    private http: HttpClient,
    public router: Router
  ) {
  }

  // create
  create(equip: Equipment) {
    return this.http.post<any>(`${this.endpoint}/create`, equip)
      // .subscribe((res: any) => {
      //   console.log(res)
      //   this.router.navigate(['equipments']);
      // })
  }

  getByID(id): Observable<any>  {
    let url = `${this.endpoint}/read/${id}`;
    return this.http.get(url, {headers: this.headers}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  getAll() {
    return this.http.get(`${this.endpoint}/list`);
  }

  getByAssignment(id): Observable<any>  {
    let url = `${this.endpoint}/assignment/${id}`;
    return this.http.get(url, {headers: this.headers}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  delete(id): Observable<any> {
    let url = `${this.endpoint}/delete/${id}`;
    return this.http.delete(url, { headers: this.headers }).pipe(
      catchError(this.handleError)
    )
  }

  edit(id, data): Observable<any> {
    let url = `${this.endpoint}/update/${id}`;
    return this.http.put(url, data, { headers: this.headers }).pipe(
      catchError(this.handleError)
    )
  }

  // Error 
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
