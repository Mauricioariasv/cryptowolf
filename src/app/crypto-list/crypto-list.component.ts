import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { interval } from 'rxjs';

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
  reloadingTableData: boolean = false

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
    this.getAssets(false, 0, 5)

    interval(5000).subscribe( () => {
    this.reloadingTableData = true
      this.getAssets(false, 0, this.cryptoAssets.length, () => {
        this.reloadingTableData = false
      })
    })
  }

  getAssets(loadMore: boolean, offset: number, limit: number, finished?: () => void) {
  this.cryptoService.getAssets(offset, limit)
      .subscribe( (assets) => {

        if(finished) finished()

        if(assets){
          (loadMore) ? this._cryptoAssets.push(...assets) : this._cryptoAssets = assets
        }
      })
  }

  goToAssetInfo(id: string){
    this.router.navigateByUrl(id)
  }

  getMoreAssets(){
    this.loadingMore = true
    this.getAssets(true, this.cryptoAssets.length, 5, () => {
      this.loadingMore = false
    })
  }

  order(term: string){
    this.activeOrderOption = term === this.activeOrderOption ? '' : term
  }

}