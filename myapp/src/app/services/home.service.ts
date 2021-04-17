import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  baseUrl = 'https://iti-good-reads.herokuapp.com/users/';
  constructor(private http: HttpClient) { }

  getAllBooks(userId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${userId}/books`);
  }

  getCurrentlyReading(userId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${userId}/currently-reading`);
  }

  getWantToRead(userId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${userId}/want-to-read`);
  }

  getRead(userId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${userId}/read`);
  }

  private messageSource = new BehaviorSubject(false);
  currentMessage = this.messageSource.asObservable();

  changeMessage(message: boolean) {
    this.messageSource.next(message)
  }
}

