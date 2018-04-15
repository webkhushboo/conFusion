import { baseURL } from './../../shared/baseurl';
import { Dish } from './../../shared/dish';
import { FavoriteProvider } from './../../providers/favorite/favorite';
import { Component, OnInit, Inject } from '@angular/core';
import { IonicPage, NavController, AlertController, LoadingController, NavParams, ItemSliding, ToastController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage implements OnInit {

  favorites: Dish[];
  errMess: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private favoriteService: FavoriteProvider,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    @Inject('BaseURL') private BaseURL,
    private alertCtrl: AlertController) {
  }

  ngOnInit() {
    this.favoriteService.getFavorites()
      .subscribe(favorites => this.favorites = favorites,
        errmess => this.errMess = errmess)
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritesPage');
  }

  deleteFavorite(item: ItemSliding, id: number) {
    console.log('delete', id);

    let alert = this.alertCtrl.create({
      title: 'Confirm Title',
      message: 'Do you want to delete Favorite ' + id,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Delete cancelled');
          }
        },
        {
          text: 'Delete',

          handler: () => {
            let loading = this.loadingCtrl.create({
              content: 'Deleting....'
            });

            let toast = this.toastCtrl.create({
              message: 'Dish ' + id + ' deleted successfully',
              duration: 3000
            });

            loading.present();

            this.favoriteService.deleteFavorite(id)
              .subscribe(favorites => {
                this.favorites = favorites,
                  loading.dismiss(); toast.present();
              },
                errmess => {
                  this.errMess = errmess;
                  loading.dismiss();
                });
          }
        }
      ]
    });

    alert.present();
    item.close();
  }
}
