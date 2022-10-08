import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { CryptoListComponent } from './crypto-list/crypto-list.component';
import { CryptoInfoComponent } from './crypto-info/crypto-info.component';

const routes: Routes = [
  {
    path: '',
    component: CryptoListComponent,
    pathMatch: 'full'
  },
  {
    path: ':id',
    component: CryptoInfoComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRountingModule {}