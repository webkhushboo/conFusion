import { FavoriteProvider } from './../../providers/favorite/favorite';
import { Comment } from './../../shared/comment';
import { Dish } from './../../shared/dish';
import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DishdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dishdetail',
  templateUrl: 'dishdetail.html',
})
export class DishdetailPage {

  dish:Dish;
  errMess :string;
  avgstars : string;
  numcomments :number;
  favorite: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  @Inject('BaseURL') private BaseURL,
   private favoriteService :FavoriteProvider) {
    this.dish = navParams.get('dish');
  //whenver disdetail page is load we will check if dish is user's favorite or not
    this.favorite = this.favoriteService.isFavorite(this.dish.id);
    this.numcomments = this.dish.comments.length;

    let total = 0;
    this.dish.comments.forEach(comment => 
    total += comment.rating);
    this.avgstars = (total/this.numcomments).toFixed(2);
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DishdetailPage');
  }

  //this function will be called from template in order to add dish to favorites list
  addToFavorites(){
    console.log('Adding to favorites', this.dish.id);
    this.favorite =this.favoriteService.addFavorite(this.dish.id);
  }
}
