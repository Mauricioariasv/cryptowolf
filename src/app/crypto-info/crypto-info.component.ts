import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { switchMap } from 'rxjs';

import { CryptoService } from '../crypto.service';

import { Asset, History, Market } from '../crypto.interfaces';

@Component({
  selector: 'app-crypto-info',
  templateUrl: './crypto-info.component.html',
  styleUrls: ['./crypto-info.component.css']
})

export class CryptoInfoComponent {

  asset: Asset | null = null;
  err: boolean = false

  history: History[] | null = null
  loadingHistory: boolean = false

  markets: Market[] | null = null
  loadingMarkets: boolean = false

  constructor(private activatedRoute: ActivatedRoute,
              private cryptoService: CryptoService){

                this.activatedRoute.params.pipe(
                  switchMap( ({id}) => this.cryptoService.getAsset(id) )
                )
                .subscribe( asset => {
                  if(asset){
                    this.asset = asset
                    this.loadOtherData()
                  } else {
                    this.err = true
                  }
                }) 
              }

  loadOtherData(){

    this.loadingHistory = true
    this.loadingMarkets = true

    this.cryptoService.getAssetHistory(this.asset!.id)
    .subscribe( (history) => {
      this.history = history!.slice(0, 10)
      this.loadingHistory = false
    })

    this.cryptoService.getAssetMarkets(this.asset!.id)
    .subscribe( (markets) => {
      this.markets = markets!.slice(0, 10)
      this.loadingMarkets = false
    })
  }

}
