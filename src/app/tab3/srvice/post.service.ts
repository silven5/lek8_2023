import { Injectable } from '@angular/core';
import { Post } from '../class/post';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PostService {
  private url: string = "https://api.jsonbin.io/v3/b/642fcfdeebd26539d0a62592";
  //створити службу для клієнтських запитів HTTP
  constructor(private httpClient: HttpClient) { }
  // отримуємо результати запиту за допомогою Observable
  public getPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(this.url)
  }



}
