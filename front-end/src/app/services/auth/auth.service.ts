import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from './userInterface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userUrl: string;

  constructor(private http: HttpClient) {
    this.userUrl = environment.serverURL + environment.userUrl;
  }

  signUp(
    name: string,
    email: string,
    password: string,
    role?: string
  ): Observable<any> {
    const userObj: User = {
      name: name,
      email: email,
      password: password,
    };
    if (role) userObj.role = role;

    return this.http.post(this.userUrl + '/signup', userObj, {
      responseType: 'json',
      observe: 'response' as 'response',
    }).pipe(tap(res => this.setSession(res)));
  }

  login(email: string, password: string): Observable<any> {
    return this.http
      .post<User>(
        this.userUrl + '/login',
        { email: email, password: password },
        {
          responseType: 'json',
          observe: 'response' as 'response',
        }
      )
      .pipe(tap((res) => this.setSession(res)));
  }

  logout(): Observable<any> {
    return this.http
      .post(
        this.userUrl + '/logout',
        {},
        { withCredentials: true, responseType: 'text' }
      )
      .pipe(
        tap((res) => {
          localStorage.removeItem('role');
          localStorage.removeItem('authToken');
        })
      );
  }

  private setSession(authResult: any) {
    console.log(authResult);
    
    localStorage.setItem('role', authResult.body.data.user.role);
    localStorage.setItem('authToken', authResult.body.token);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('authToken') != null;
  }

  isAdmin(): boolean {
    return localStorage.getItem('role') == 'admin';
  }
}
