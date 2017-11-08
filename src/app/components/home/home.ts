import { OnInit, Component } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'home',
  templateUrl: './home.html',
  styleUrls: ['./home.scss']


})
export class HomeComponent {

  constructor(private router: Router) { }
  tools() {
    this.router.navigate(['/tools']);

  }
  clothes() {
    this.router.navigate(['/clothes']);

  }
  others() {
    this.router.navigate(['/others']);

  }
  fernuture() {
    this.router.navigate(['/fernuture']);

  }
  maintenance() {
    this.router.navigate(['/maintenance']);

  }
}