import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BankService {
  constructor(private httpClient: HttpClient) {}

  public bankResponse(): Observable<any> {
    const url = `https://1.api.fy23ey06.careers.ifelsecloud.com/`;
    return this.httpClient.get(url, {
      responseType: 'json',
      observe: 'body',
    });
  }
}
