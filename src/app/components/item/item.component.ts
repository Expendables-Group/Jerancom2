import { OnInit, Component, ElementRef, Input } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
const URL = ' https://jerancoma.herokuapp.com/upload';

@Component({
    selector: 'item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.scss']
})
export class ItemComponent {

    picture: String;
    item = [];
    owner: number;
    owner_name: String;
    longitude: number;
    constructor(private http: Http, private el: ElementRef, private router: Router) { }

    ngOnInit() {

        this.http.get('https://jerancoma.herokuapp.com/prof')
            .map(res => res.json())
            .subscribe(
            data => {
                this.item = data;
                this.owner_name = data[0].username
                this.owner = data[0].user_id;
                this.longitude = data[0].longitude;
                console.log("here is the .............................", data)
                console.log("username ", data[0].username);

            },
            err => console.log("eeeeeeeeeeeeeeeerrrrrrrror", err),
            () => console.log("here is the item ")
            );

    }
    name: String;
    type: String;
    price: Number;
    info: String;
    filestring: string;
    files: FileList;
    upload() {
        const that = this
        let body = JSON.stringify(that.filestring);
        let headers = new Headers({ 'Content-Type': 'undefined' });
        headers.append('Authorization', `Client-ID a9a8040fbe41477`);
        let options = new RequestOptions({ headers: headers });

        this.http.post('https://api.imgur.com/3/image', body, options)
            .subscribe(
            data => {
                alert('done');
                console.log(data.json().data.link, "thiiiiiis////////////////******")
                that.picture = data.json().data.link;
            },
            error => {
                console.log(error, "erooooooooooooooooooe");
            }
            )
    }

    getFile(event) {
        this.files = event.target.files;
        console.log(event.target.files);
        var reader = new FileReader();
        reader.onload = this._handleReaderLoaded.bind(this);
        reader.readAsBinaryString(this.files[0]);
    }

    _handleReaderLoaded(readerEvt) {
        var binaryString = readerEvt.target.result;
        this.filestring = btoa(binaryString);  // Converting binary string data.
        console.log(this.filestring);
    }

    submit() {

        console.log("oooooooooooooooooooooooooooooooowwwwwwwwwww", this.owner_name)
        const that = this;
        console.log(that)
        console.log(that.picture);

        this.http.post('https://jerancoma.herokuapp.com/item', {
            itemname: that.name,
            price: that.price,
            info: that.info,
            itemtype: that.type,
            picture: that.picture,
            owner: that.owner,
            owner_name: that.owner_name,
            longitude: that.longitude,
            latitude: that.item[0].latitude
        })
            .subscribe(
            data => {
                alert('ok');
                this.router.navigate(['/home']);
                console.log(data)
            },
            error => {
                console.log(error, "erooooooooooooooooooe");
            }
            )

    }

}









