import { Component, OnInit } from '@angular/core';

const array = [
  'http://via.placeholder.com/400x450/3F51B5/fff',
  'http://via.placeholder.com/400x250/3F51B5/fff',
  'http://via.placeholder.com/400x550/3F51B5/fff',
  'http://via.placeholder.com/400x150/3F51B5/fff',
  'http://via.placeholder.com/400x250/3F51B5/fff',
  'http://via.placeholder.com/400x650/3F51B5/fff',
  'http://via.placeholder.com/400x550/3F51B5/fff',
  'http://via.placeholder.com/400x450/3F51B5/fff',
  'http://via.placeholder.com/400x450/3F51B5/fff'
];

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})

export class ImagesComponent implements OnInit {

  array1 = [];
  array2 = [];
  array3 = [];

  constructor() { }

  ngOnInit(): void {
    this.divideElementArray();
  }

  divideElementArray() {
    let i = 1;

    if (array && array.length > 0) {
      // tslint:disable-next-line:prefer-for-of
      for (let index = 0; index < array.length; index++) {
        const element = array[index];

        if (i === 1) {
          this.array1.push(element);
          i++;
        } else if (i === 2) {
          this.array2.push(element);
          i++;
        } else if (i === 3) {
          this.array3.push(element);
          i = 1;
        }

      }
    }
  }

  messageCopy(link) {
    return `Đã copy thành công. Link: ${link}`;
  }


  copyLinkImage(val: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }


}
