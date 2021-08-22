import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QueryString } from 'src/app/helpers/QueryString';
import { environment } from 'src/environments/environment';
import { Todo } from './todoInterface';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  http: any;
  private _todoUrl: any;

  constructor() {
    this._todoUrl = environment.serverURL + environment.todoUrl;
  }

  getAllTodos(queryParams: Array<string>): Observable<any> {
    return this.http.get(
      this._todoUrl + QueryString.createQueryString(queryParams),
      {
        withCredentials: true,
        responseType: "json",
        observe: "response" as "response",
      }
    );
  }

  getMyTodos(): Observable<any> {
    return this.http.get(
      this._todoUrl + '/myTodos',
      {
        withCredentials: true,
        responseType: "json",
        observe: "response" as "response",
      }
    );
  }

  getTodo(id: string): Observable<any> {
    return this.http.get(this._todoUrl + "/" + id, {
      withCredentials: true,
      responseType: "json",
      observe: "response" as "response",
    });
  }

  deleteTodo(email: string): Observable<any> {
    return this.http.delete(this._todoUrl + "/" + email, {
      withCredentials: true,
      responseType: "json",
      observe: "response" as "response",
    });
  }

  updateTodo(
    email: string,
    todo: Todo
  ): Observable<any> {
    return this.http.patch(this._todoUrl + "/" + email, todo, {
      withCredentials: true,
      responseType: "json",
      observe: "response" as "response",
    });
  }

  createTodo(todo: Todo): Observable<any> {
    return this.http.post(this._todoUrl, todo, {
      withCredentials: true,
      responseType: "json",
      observe: "response" as "response",
    });
  }

}
