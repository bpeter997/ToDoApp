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

  deleteFlight(email: string): Observable<any> {
    return this.http.delete(this._userUrl + "/" + email, {
      withCredentials: true,
      responseType: "json",
      observe: "response" as "response",
    });
  }

  updateFlight(
    flightId: string,
    user: User
  ): Observable<any> {
    return this.http.patch(this._userUrl + "/" + flightId, user, {
      withCredentials: true,
      responseType: "json",
      observe: "response" as "response",
    });
  }

}
