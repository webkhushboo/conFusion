import { LocalNotifications } from '@ionic-native/local-notifications';
import { DishProvider } from './../dish/dish';
import { Observable } from 'rxjs/Observable';
import { Dish } from './../../shared/dish';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class FavoriteProvider {

  favorites : Array<any>;

  constructor(public http: Http ,private dishService :DishProvider,
   private localNotifications : LocalNotifications) {
    console.log('Hello FavoriteProvider Provider');
    this.favorites =[];
  }
addFavorite(id :number):boolean{
  if(!this.isFavorite(id)) {
    this.favorites.push(id);
    this.localNotifications.schedule({
       id:id,
       text : 'Dish ' +id + ' added as a favotrite successfully'
    });
  }
 return true;
}

isFavorite(id :number) :boolean{
 return this.favorites.some(el => el ===id);
}

getFavorites() : Observable<Dish[]>{
  return this.dishService.getDishes()
        .map(dishes => 
          dishes.filter(dish => this.favorites.some(el => el === dish.id)));
}

deleteFavorite(id :number) : Observable<Dish[]>{
  let index = this.favorites.indexOf(id);
  if(index >= 0){
      this.favorites.splice(index,1);// This method will delete particular item from the array
      return this.getFavorites();
  }
  else {
    console.log("Deleting non-existant favorites",id);
    return Observable.throw('Deleting non-existant favorite' +id);
  }
}
}
