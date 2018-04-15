import { SocialSharing } from '@ionic-native/social-sharing';
import { CommentPage } from './../comment/comment';
import { FavoriteProvider } from './../../providers/favorite/favorite';
import { Dish } from './../../shared/dish';
import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, ActionSheetController, NavParams, ToastController, ModalController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-dishdetail',
  templateUrl: 'dishdetail.html',
})
export class DishdetailPage {

  dish: Dish;
  errMess: string;
  avgstars: string;
  numcomments: number;
  favorite: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private socialSharing: SocialSharing,
    @Inject('BaseURL') private BaseURL,
    private favoriteService: FavoriteProvider,
    private toastCtrl: ToastController,
    private actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController) {
    this.dish = navParams.get('dish');
    //whenver disdetail page is load we will check if dish is user's favorite or not
    this.favorite = this.favoriteService.isFavorite(this.dish.id);
    this.numcomments = this.dish.comments.length;

    let total = 0;
    this.dish.comments.forEach(comment =>
      total += comment.rating);
    this.avgstars = (total / this.numcomments).toFixed(2);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DishdetailPage');
  }

  //this function will be called from template in order to add dish to favorites list
  addToFavorites() {
    console.log('Adding to favorites', this.dish.id);
    this.favorite = this.favoriteService.addFavorite(this.dish.id);
    this.toastCtrl.create({
      message: 'Dish ' + this.dish.id + ' added as a favorite successfully',
      duration: 3000
    }).present();
  }
  openActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select actions',
      buttons: [
        {
          text: 'Add to Favorites',
          handler: () => {
            this.addToFavorites();
          }
        }, {
          text: 'Add Comment',
          handler: () => {
            this.openCommentDialog();
          }
        },
        {
          text: 'Share via facebook',
          handler: () => {
            this.socialSharing.shareViaFacebook(
              this.dish.name + '--' + this.dish.description,
              this.BaseURL + this.dish.image, 
              ''
            ).then((response) => console.log("posted to facebook successfully", this.dish.name + '--' + this.dish.description,this.BaseURL + this.dish.image))
              .catch((error) => console.log('Failed to post on facebook',error));
          }
        },
        {
          text: 'Share via twitter',
          handler: () => {
            this.socialSharing.shareViaTwitter(
              this.dish.name + '----' + this.dish.description,
              this.BaseURL + this.dish.image, ''
            ).then(() => console.log("Posted to Twitter successfully"))
              .catch(() => console.log('Failed to post on Twitter'));
          }
        }, {
          text: 'Share via Whatsapp',
          handler: () => {
            this.socialSharing.shareViaWhatsApp(
              this.dish.name + '----' + this.dish.description,
              this.BaseURL + this.dish.image, ''
            ).then(() => console.log("Posted to Twitter successfully"))
              .catch(() => console.log('Failed to post on Twitter'));
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  openCommentDialog() {
    let modal = this.modalCtrl.create(CommentPage);
    modal.onDidDismiss(data => {
      // Do things with data coming from modal, for instance :

      var currentDate = new Date().toDateString();
      data["date"] = currentDate;
      this.dish.comments.push(data);
      console.log("Data on dish page :", data);
    });
    modal.present();
  }
}
