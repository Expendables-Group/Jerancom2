import { OnInit, Component, NgModule } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
// import { HttpClient } from '@angular/common/http';
//import { NgModule} from '@angular/core'
//import {BrowserModule} from '@angular/platform-browser'
import { RouterModule } from '@angular/router'
//...................................................
import { HttpHeaders } from '@angular/common/http';
import { HomeComponent } from './components/home/home';
import { LoginComponent } from './components/login/login.component';
import { signupComponent } from './components/signup/signup.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']


})
//***********************************************/
export class AppComponent {
  name: String;
  password: String
  constructor(public http: Http) {

  }
  send() {
    const that = this;
    console.log(that)
    this.http.post('https://jerancoma.herokuapp.com/app', {
      username: that.name,
      password: that.password
    })
   
      .subscribe(
      data => {
        alert('ok');
        console.log(data)
      },
      error => {
        console.log(error, "erooooooooooooooooooe");
      }
      )

  }

}