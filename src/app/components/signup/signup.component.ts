import { OnInit, Component } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ElementRef, NgZone, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']


})
//*********************************************************************************/
export class signupComponent implements OnInit {

  name: String;
  password: String;
  phone: Number;
  email: String;
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor( private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, public http: Http, private router: Router) {

   }

  /**********************************************************************************/
  ngOnInit() {
    //set google maps defaults
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 4;
          console.log(this.latitude)
          console.log(this.longitude)

        });
      });
    });

  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 4;
        console.log(this.longitude);
      });
    }
  }

  /*********** */

  submit() {
    const that = this;
    console.log(that)
    this.http.post('https://jerancoma.herokuapp.com/user', {
      username: that.name,
      password: that.password,
      phone: that.phone,
      longitude: that.longitude,
      latitude: that.latitude,
      email:that.email

    })
 
      .subscribe(
      data => {
        alert('SingUp correctly');
        console.log(data)

        this.router.navigate(['/login']);

      },
      error => {
        console.log(error, "erooooooooooooooooooe");
      }
      )


  }
}