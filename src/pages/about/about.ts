import { LeaderProvider } from './../../providers/leader/leader';
import { Leader } from './../../shared/leader';
import { Component, Inject, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage implements OnInit{
 
   leaders : Leader[];
   errMess : string;
   
  constructor(public navCtrl: NavController, public navParams: NavParams,
  @Inject('BaseURL') private BaseURL,private leaderService :LeaderProvider) {
  
  }
  ngOnInit() {
    this.leaderService.getLeaders()
    .subscribe(leaders => this.leaders =leaders,)
     errMess => this.errMess =<any>errMess   
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

}
