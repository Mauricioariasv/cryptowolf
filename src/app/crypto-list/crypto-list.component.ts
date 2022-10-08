import { Component, OnInit } from '@angular/core';
import { CryptoService } from '../crypto.service';
import { Asset } from '../crypto.interfaces';

@Component({
  selector: 'app-crypto-list',
  templateUrl: './crypto-list.component.html',
  styleUrls: ['./crypto-list.component.css']
})

export class CryptoListComponent implements OnInit {

  private _cryptoAssets: Asset[] = [];

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

  activeOrderOption: string = ''

  get cryptoAssets(){
    const cryptoAssetsCopy = [...this._cryptoAssets]

    switch (this.activeOrderOption) {
      case ('name'):
        return cryptoAssetsCopy.sort( (a, b) => a.name.localeCompare(b.name) )
        break;
      case 'priceUsd':
      case 'marketCapUsd':
      case 'volumeUsd24Hr':
      case 'changePercent24Hr':
        return cryptoAssetsCopy.sort( (a, b) => {
          return Number(b[this.activeOrderOption as keyof Asset]) - Number(a[this.activeOrderOption as keyof Asset])
        })
      default:
        return cryptoAssetsCopy
        break;
    }
  }

  constructor(private cryptoService: CryptoService) { }

  ngOnInit(): void {
    this.getAssets(false, this.cryptoAssets.length, 5)
  }

  getAssets(push: boolean, offset: number, limit: number) {
    this.cryptoService.getAssets(offset, limit)
      .subscribe( (assets) => {
        if(typeof assets !== 'boolean'){
          push ? this._cryptoAssets.push(...assets) : this._cryptoAssets = assets
        }
      })
  }

  getMoreAssets(){
    this.getAssets(true, this.cryptoAssets.length, 5)
  }

  order(term: string){
    this.activeOrderOption = term === this.activeOrderOption ? '' : term
  }

}