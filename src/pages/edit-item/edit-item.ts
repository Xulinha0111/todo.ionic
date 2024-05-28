import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-edit-item',
  templateUrl: 'edit-item.html',
})
export class EditItemPage {

  itemAnt;
  title;
  description;

  constructor(public navParams: NavParams, public view: ViewController) {
  }

  ionViewDidLoad() {
    this.itemAnt      = this.navParams.get('item');
    this.title        = this.itemAnt.title
    this.description  = this.itemAnt.description;
  }

  updateItem() {
    let newItem = {
      title: this.title,
      description: this.description
    }
    this.view.dismiss({itemAnt: this.itemAnt, newItem: newItem});
  }

  close(){
    this.view.dismiss();
  }

}
