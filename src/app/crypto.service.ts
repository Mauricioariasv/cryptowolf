import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';

import { AssetsResponse } from './crypto.interfaces';
import { catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CryptoService {

  private apiUrl = 'https://api.coincap.io/v2'

  constructor(private http: HttpClient) { }

  getAssets(offset: number = 0, limit: number = 5){
    const params = new HttpParams()
    .set('limit', limit)
    .set('offset', offset)
  
    return this.http.get<AssetsResponse>(`${this.apiUrl}/assets`, {params})
      .pipe(
        map(res => res.data),
        catchError(err => of(false))
      )
  }

}