import { LoginPage } from './../pages/login/login';
import { baseURL } from './../shared/baseurl';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule} from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import {IonicStorageModule} from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AboutPage } from './../pages/about/about';
import { ContactPage } from './../pages/contact/contact';
import { MenuPage } from './../pages/menu/menu';
import { DishdetailPage } from './../pages/dishdetail/dishdetail';
import {FavoritesPage} from './../pages/favorites/favorites'
import {ReservationPage} from './../pages/reservation/reservation'
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {LocalNotifications} from '@ionic-native/local-notifications';
import {EmailComposer} from '@ionic-native/email-composer';
import { DishProvider } from '../providers/dish/dish';
import { LeaderProvider } from '../providers/leader/leader';
import { ProcessHttpmsgProvider } from '../providers/process-httpmsg/process-httpmsg';
import { PromotionProvider } from '../providers/promotion/promotion';
import { FavoriteProvider } from '../providers/favorite/favorite';
import { CommentPage } from '../pages/comment/comment';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AboutPage,
    MenuPage,
    ContactPage,
    FavoritesPage,
    DishdetailPage,
    ReservationPage,
    CommentPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AboutPage,
    MenuPage,
    ContactPage,
    DishdetailPage,
    FavoritesPage,
    ReservationPage,
    CommentPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LocalNotifications,
    EmailComposer,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DishProvider,
    LeaderProvider,
    ProcessHttpmsgProvider,
    PromotionProvider,
    {provide:'BaseURL' ,useValue:baseURL},
    FavoriteProvider
  ]
})
export class AppModule {}
