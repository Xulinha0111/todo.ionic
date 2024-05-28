//import { HttpClient } from '@angular/common/http';
import {Storage} from '@ionic/storage';
import { Injectable } from '@angular/core';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class Data {

  //constructor(public http: HttpClient) {
  constructor(public storage: Storage) {

  }

  getData() {
    return this.storage.get('todos');
  }

  save(data) {
    this.storage.set('todos', data);
  }


}
