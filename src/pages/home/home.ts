import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SearchService } from '../../providers/api/search.service';
import { Photo } from '../../interfaces';
import { PhotoEntity, SearchGet } from '../../interfaces/SearchGet';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  scrollIndex: number;
  photos: Photo[];
  searchItem: string;

  constructor(public navCtrl: NavController, public search: SearchService) {
    this.photos = [];
    this.searchItem = '';
  }

  onSearch = (input: string) => {
    this.searchItem = input || 'undefined';
    this.scrollIndex = 1;
    this.photos = [];

    this.getNewItems((res: SearchGet) => {
      this.photos = res.photos.photo.map(this.mapEntityToPhoto);
    });
  };

  doInfinite = infiniteScroll => {
    this.scrollIndex += 1;

    this.getNewItems((res: SearchGet) => {
      this.photos = [
        ...this.photos,
        ...res.photos.photo.map(this.mapEntityToPhoto),
      ];

      infiniteScroll.complete();
    });
  };

  getNewItems = (subscribeCB: (res: SearchGet) => void) =>
    this.search.get(this.searchItem, this.scrollIndex).subscribe(subscribeCB);

  mapEntityToPhoto = (photo: PhotoEntity): Photo => {
    const { farm, server, id, secret } = photo;
    const imageUrl = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;
    return { imageUrl };
  };
}
