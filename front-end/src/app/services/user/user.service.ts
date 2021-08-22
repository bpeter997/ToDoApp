import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QueryString } from 'src/app/helpers/QueryString';
import { environment } from 'src/environments/environment';
import { User } from '../auth/userInterface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  http: any;
  private _userUrl: any;

  constructor() {
    this._userUrl = environment.serverURL + environment.userUrl;
  }

  getAllUser(queryParams: Array<string>): Observable<any> {
    return this.http.get(
      this._userUrl + QueryString.createQueryString(queryParams),
      {
        withCredentials: true,
        responseType: "json",
        observe: "response" as "response",
      }
    );
  }

  getUser(email: string): Observable<any> {
    return this.http.get(this._userUrl + "/" + email, {
      withCredentials: true,
      responseType: "json",
      observe: "response" as "response",
    });
  }

  getMe(): Observable<any> {
    return this.http.get(this._userUrl + "/me", {
      withCredentials: true,
      responseType: "json",
      observe: "response" as "response",
    });
  }

  deleteUser(email: string): Observable<any> {
    return this.http.delete(this._userUrl + "/" + email, {
      withCredentials: true,
      responseType: "json",
      observe: "response" as "response",
    });
  }

  updateUser(
    email: string,
    user: User
  ): Observable<any> {
    return this.http.patch(this._userUrl + "/" + email, user, {
      withCredentials: true,
      responseType: "json",
      observe: "response" as "response",
    });
  }

  updateMe(user: User): Observable<any> {
    return this.http.patch(this._userUrl + "/updateMe", user, {
      withCredentials: true,
      responseType: "json",
      observe: "response" as "response",
    });
  }

}
