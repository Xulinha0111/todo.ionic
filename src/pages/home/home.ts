import { Component } from '@angular/core';
import { AlertController, ModalController, NavController } from 'ionic-angular';
import { Data } from '../../providers/data/data';

import { AddItemPage } from '../add-item/add-item';
import { ItemDetailPage } from '../item-detail/item-detail';
import { EditItemPage } from '../edit-item/edit-item';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public items = [];

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public dataService: Data,
    public alertCtrl: AlertController) {
    this.dataService.getData().then((todos) => {
      if (todos) {
        this.items = todos;
      }
    });
  }

  ionViewDidLoad(){
  /*  this.items = [
      {title: "Viver", description: "Senão a gente morre"},
      {title: "Trabalhar", description: "Senão a gente não tem dinheiro"},
      {title: "Estudar", description: "Senão a gente não arruma emprego"},
      {title: "Cuidar da Família", description: "Senão não tem porque ter dinheiro"}
      ]
  */
  }

  addItem(){
    let addModal = this.modalCtrl.create(AddItemPage);
    addModal.onDidDismiss((item) => {
      if (item) {
        this.saveItem(item);
      }
    });
    addModal.present();
  }

  saveItem(item){
    this.items.push(item);
    this.dataService.save(this.items);
  }

  viewItem(item){
    this.navCtrl.push(ItemDetailPage, {item: item});
  }

  async deleteItem(item){
      const confirm = await this.alertCtrl.create({
      title: 'Confirmação',
      message: 'Você tem certeza que deseja excluir esta tarefa?',
      buttons: [
        { text: 'Sim',
          role: 'Ok',
          handler: () => {
            const index = this.items.indexOf(item);
            this.items.splice(index, 1);
            this.dataService.save(this.items);
          }
        },
        { text: 'Não',
          role: 'Cancel'}]
        });
      await confirm.present();
  }

  editItem(item) {
    let editModal = this.modalCtrl.create(EditItemPage, {item: item});
    editModal.onDidDismiss((info) => {
      if (info) {
        this.updateItem(info);
      }
    });
    editModal.present();
  }

  updateItem(info) {
    const index = this.items.indexOf(info.itemAnt);
    this.items.splice(index, 1, info.newItem);
    this.dataService.save(this.items);
  }

}
