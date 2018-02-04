import { DishProvider } from './../dish/dish';
import { Observable } from 'rxjs/Observable';
import { Dish } from './../../shared/dish';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

/*
  Generated class for the FavoriteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FavoriteProvider {

  favorites : Array<any>;

  constructor(public http: Http ,private dishService :DishProvider) {
    console.log('Hello FavoriteProvider Provider');
    this.favorites =[];
  }
addFavorite(id :number):boolean{
  if(!this.isFavorite(id))
    this.favorites.push(id);
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
