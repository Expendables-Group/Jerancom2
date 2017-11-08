import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

@Injectable()
export class ChatRoomService {
  constructor(private http: Http) { }
  // Our localhost address that we set in our server code
  private url = 'https://jerancoma.herokuapp.com';
  socket;

  send(message, name) {
    this.socket.emit('giveChat', [message, name]);
  }

  get() {
    let observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('newChat', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    })
    console.log(observable)
    return observable;
  }
}