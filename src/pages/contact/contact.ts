import { EmailComposer } from '@ionic-native/email-composer';
import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {

  constructor(private emailComposer:EmailComposer) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPage');
  }

  sendEmail(){
    let email = {
      to : 'web.khushboo@gmail.com',
      subject: '[Confusion]Testing with ionic app',
      body:'Dear Sir/Madam',
      isHtml:true
    };

    this.emailComposer.open(email);
  }

}
