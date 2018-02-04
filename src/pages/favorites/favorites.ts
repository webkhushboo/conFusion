import { baseURL } from './../../shared/baseurl';
import { Dish } from './../../shared/dish';
import { FavoriteProvider } from './../../providers/favorite/favorite';
import { Component ,OnInit ,Inject } from '@angular/core';
import { IonicPage, NavController, NavParams ,ItemSliding,ToastController} from 'ionic-angular';
/**
 * Generated class for the FavoritesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage implements OnInit{

  favorites : Dish[];
  errMess : string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private favoriteService :FavoriteProvider,
  private toastCtrl:ToastController,
  @Inject('BaseURL') private BaseURL
  ) {
  }

  ngOnInit(){
    this.favoriteService.getFavorites()
    .subscribe(favorites => this.favorites =favorites,
    errmess => this.errMess =errmess)
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritesPage');
  }
  
  deleteFavorite(item : ItemSliding, id:number){
    console.log('delete',id);
    this.favoriteService.deleteFavorite(id)
    .subscribe(favorites => this.favorites =favorites,
      errmess => this.errMess =errmess);
      this.toastCtrl.create({
        message : 'Dish ' +id + ' deleted successfully',
        duration :3000
      }).present(); // present method will show the toast notification
      item.close();
  }
}
