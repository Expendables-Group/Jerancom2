import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { Http, Response, Headers } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [
    /**********************************************************************************************************/
    /*******                    ANIMATION TO RENDER THE ITEMS FROM DATABASE                             *******/
    /**********************************************************************************************************/
    trigger('listAnimation', [
      transition('* => *', [

        query(':enter', style({ opacity: 0 }), { optional: true }),

        query(':enter', stagger('300ms', [
          animate('1s ease-in', keyframes([
            style({ opacity: 0, transform: 'translateY(-75%)', offset: 0 }),
            style({ opacity: .5, transform: 'translateY(35px)', offset: 0.3 }),
            style({ opacity: 1, transform: 'translateY(0)', offset: 1.0 }),
          ]))]), { optional: true }),

        query(':leave', stagger('300ms', [
          animate('1s ease-in', keyframes([
            style({ opacity: 1, transform: 'translateY(0)', offset: 0 }),
            style({ opacity: .5, transform: 'translateY(35px)', offset: 0.3 }),
            style({ opacity: 0, transform: 'translateY(-75%)', offset: 1.0 }),
          ]))]), { optional: true })
      ])
    ]),
    trigger('explainerAnim', [
      transition('* => *', [
        query('.row', style({ opacity: 0, transform: 'translateX(-40px)' })),

        query('.row', stagger('500ms', [
          animate('800ms 1.2s ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
        ]))
      ])
    ])

  ]
})

/**********************************************************************************************************/
/*******                    GET items FROM DATABASE AND RENDER IT IN THE PAGE                       *******/
/**********************************************************************************************************/
export class ProfileComponent {

  constructor(public http: Http) { }

  item = [];
  arrlog = [];
  rents = []
  ngOnInit() {

    this.http.get('https://jerancoma.herokuapp.com/prof')
      .map(res => res.json())
      .subscribe(
      data => {
        this.arrlog = data;
        console.log("here is the .............................", data)
        console.log("username ", data[0].username);

      },
      err => console.log("eeeeeeeeeeeeeeeerrrrrrrror", err),
      () => console.log("here is the item ")
      );
    /****************************************************************************/
    this.http.get('https://jerancoma.herokuapp.com/profiler')
      .map(res => res.json())
      .subscribe(
      data => {
        this.item = data;
      },
      err => console.log(err),
      () => console.log("here is the item ")
      );
    /***************************************************************************/
    this.http.get('https://jerancoma.herokuapp.com/getrents')
      .map(res => res.json())
      .subscribe(
      data => {
        this.rents = data;
        console.log("rented item ", data)
      },
      err => console.log(err),
      () => console.log("here is the item ")
      );

  }





}


