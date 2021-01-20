import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})

export class ImagesComponent implements OnInit {

  array1 = [];
  array2 = [];
  array3 = [];
  linkRemove = '';
  makeLinkRemove = '';

  @ViewChild('confirmModal', { static: false }) confirmModal: ModalDirective;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.search();
  }

  search() {
    const url = `${environment.urlApi}/api/getListImage`;

    this.http.get(url, {})
      .subscribe(
        (res: any) => {
          this.divideElementArray(res);
        }
      );
  }


  divideElementArray(array) {
    let i = 1;
    this.array1 = [];
    this.array2 = [];
    this.array3 = [];
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

  makeLinkImage(link) {
    return `${environment.urlApi}${link}`;
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

  removeImage(linkRemove) {
    this.linkRemove = linkRemove;
    this.makeLinkRemove = `${environment.urlApi}${linkRemove}`;
    this.confirmModal.show();
  }

  remove() {
    const url = `${environment.urlApi}/api/deleteImage`;
    const body = {
      link: this.linkRemove
    };
    this.http.post(url, body, { responseType: 'text' })
      .subscribe(
        (res: any) => {
          this.confirmModal.hide();
          this.search();
        }
      );
  }
}
