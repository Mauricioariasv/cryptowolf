import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CryptoService } from '../crypto.service';

import { Asset } from '../crypto.interfaces';

@Component({
  selector: 'app-crypto-list',
  templateUrl: './crypto-list.component.html',
  styleUrls: ['./crypto-list.component.css']
})

export class CryptoListComponent implements OnInit {

  private _cryptoAssets: Asset[] = [];

  activeOrderOption: string = ''

  get cryptoAssets(){
    const cryptoAssetsCopy = [...this._cryptoAssets]

    switch (this.activeOrderOption) {
      case ('name'):
        return cryptoAssetsCopy.sort( (a, b) => a.name.localeCompare(b.name))

      case 'priceUsd':
      case 'marketCapUsd':
      case 'volumeUsd24Hr':
      case 'changePercent24Hr':
        return cryptoAssetsCopy.sort( (a, b) => {
          return Number(b[this.activeOrderOption as keyof Asset]) - Number(a[this.activeOrderOption as keyof Asset])
        })

      default:
        return cryptoAssetsCopy
    }
  }

  loadingMore: boolean = false

  tableHeads = [
    {
      name: 'Nombre',
      orderOption: 'name'
    },
    {
      name: 'Precio',
      orderOption: 'priceUsd'
    },
    {
      name: 'Market Cap',
      orderOption: 'marketCapUsd'
    },
    {
      name: 'Volumen 24h',
      orderOption: 'volumeUsd24Hr'
    },
    {
      name: 'Cambio en 24h',
      orderOption: 'changePercent24Hr'
    },
  ]

  constructor(private cryptoService: CryptoService,
              private router: Router) { }

  ngOnInit(): void {
    this.getAssets(false, this.cryptoAssets.length, 5)
  }

  getAssets(loadMore: boolean, offset: number, limit: number) {
    this.cryptoService.getAssets(offset, limit)
      .subscribe( (assets) => {
        if(assets){
          if(loadMore){
            this._cryptoAssets.push(...assets)
            this.loadingMore = false
          } else {
            this._cryptoAssets = assets
          }
        }
      })
  }

  goToAssetInfo(id: string){
    this.router.navigateByUrl(id)
  }

  getMoreAssets(){
    this.loadingMore = true
    this.getAssets(true, this.cryptoAssets.length, 5)
  }

  order(term: string){
    this.activeOrderOption = term === this.activeOrderOption ? '' : term
  }

}