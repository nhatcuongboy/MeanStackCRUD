import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  endpoint: string = 'http://localhost:4000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser: Object = {};
  roles: string;
  id: string;

  constructor(
    private http: HttpClient,
    public router: Router
  ) {
  }

  // Sign-up
  signUp(user: User): Observable<any> {
    let api = `${this.endpoint}/register-user`;
    return this.http.post(api, user)
    // .pipe(
    //   catchError(this.handleError)
    // )
  }

  // Sign-in
  signIn(user: User) {
    return this.http.post<any>(`${this.endpoint}/signin`, user).subscribe(
      (res) => {
        this.roles = res.roles
        localStorage.setItem("roles", res.roles)
        this.id = res._id
        localStorage.setItem("current_id", res._id)
        localStorage.setItem('access_token', res.token)
        this.router.navigate(['equipments']);
      }, (error) => {
        if (error.status === 401) {
          alert("Wrong email or password!")
        } else {
          console.log(error);
        }

      })
  }


  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  get isAdmin(): boolean {
    return localStorage.getItem("roles") === "administrator"
  }

  get getId(): string {
    return localStorage.getItem("current_id") 
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    localStorage.removeItem('roles');
    localStorage.removeItem('current_id');
    if (removeToken == null) {
      this.router.navigate(['log-in']);
    }
  }

  getUsers() {
    return this.http.get(`${this.endpoint}/users`);
  }

  // User profile
  getUserProfile(id): Observable<any> {
    let api = `${this.endpoint}/user-profile/${id}`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  deleteUser(id): Observable<any> {
    let url = `${this.endpoint}/delete-user/${id}`;
    return this.http.delete(url, { headers: this.headers }).pipe(
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