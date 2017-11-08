import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatRoomService } from './chatRoom.service';
import { Subject } from 'rxjs/Subject';
import { Http, Response, Headers } from '@angular/http';
@Component({
  selector: 'chat-app',
  templateUrl: './chatRoom.component.html',
  styleUrls: ['./chatRoom.scss'],
  providers: [ChatRoomService]
})
export class chatRoomComponent implements OnInit, OnDestroy {
  chats = [];
  connection;
  chat;
  name;
  color = [];
  x;
  newColor;
  constructor(private http: Http, private ChatRoomService: ChatRoomService) { }
  send() {
    this.ChatRoomService.send(this.chat, this.name);
    this.chat = '';
    this.name = '';


    this.color = ['green', 'red', 'yellow', 'black', 'blue']
    this.x = this.color[Math.floor((Math.random() * 5))]
    this.newColor = "color: " + this.x;
    console.log(this.newColor)

  }

  ngOnInit() {
    this.http.get('https://jerancoma.herokuapp.com/prof')
      .map(res => res.json())
      .subscribe(
      data => {

        console.log("here is the .............................", data)
        console.log("username ", data[0].username);
        this.name = data[0].username
      },
      err => console.log("eeeeeeeeeeeeeeeerrrrrrrror", err),
      () => console.log("here is the item ")
      );
    this.connection = this.ChatRoomService.get().subscribe(message => {
      this.chats.push(message);
      console.log("mmmmmmmmmmm", message)

    })

  }
  ngOnDestroy() {
    this.connection.unsubscribe();
  }

}
