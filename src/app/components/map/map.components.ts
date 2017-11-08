import { Component } from '@angular/core';
import { ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { Http, Response, Headers } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'map',
  styles: [`
    agm-map {
      height: 300px;
      width:800px;
    }
    input{
      width:800px
    }
  `],
  template: `
    <div class="container">
    
      <!---<div class="form-group">
        <input placeholder="search for location" autocorrect="off" autocapitalize="off" spellcheck="off" type="text" class="form-control" #search [formControl]="searchControl">
      </div>---->
      <agm-map [latitude]="latitude" [longitude]="longitude" [scrollwheel]="false" [zoom]="zoom">
        <agm-marker [latitude]="latitude" [longitude]="longitude"></agm-marker>
      </agm-map>
     
    </div>
    
  `
})

export class MapComponent implements OnInit {

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    public http: Http
  ) { }

  ngOnInit() {
    //set google maps defaults
    this.zoom = 10;
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
          this.zoom = 10;
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
        this.zoom = 10;
        console.log(this.longitude);
        console.log(this.latitude);
      });
    }
  }



  sendloc() {
    const that = this;
    console.log(that)
    this.http.post('https://jerancoma.herokuapp.com/loc', {
      longitude: that.longitude,
      latitude: that.latitude

    })
      .subscribe(
      data => {
        alert('location saved');
        console.log(data)
      },
      error => {
        console.log(error, "erooooooooooooooooooe");
      }
      )

  }
}

