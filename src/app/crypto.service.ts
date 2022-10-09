import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { catchError, map, of } from 'rxjs';

import { AssetsResponse, AssetResponse, AssetHistoryResponse, AssetMarketResponse } from './crypto.interfaces';

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
      catchError(err => of(null))
    )
  }

  getAsset(id: string){
    return this.http.get<AssetResponse>(`${this.apiUrl}/assets/${id}`)
    .pipe(
      map(res => res.data),
      catchError(err => of(null))
    )
  }

  getAssetHistory(id: string){
    const params = new HttpParams()
    .set('interval', 'd1');

    return this.http.get<AssetHistoryResponse>(`${this.apiUrl}/assets/${id}/history`, {params})
    .pipe(
      map(res => res.data),
      catchError(err => of(null))
    )
  }

  getAssetMarkets(id: string){
    return this.http.get<AssetMarketResponse>(`${this.apiUrl}/assets/${id}/markets`)
    .pipe(
      map(res => res.data),
      catchError(err => of(null))
    )
  }

}