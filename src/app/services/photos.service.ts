import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {
  mainUrl: string = ' https://www.flickr.com/services/rest/?method=flickr.';

  constructor(private httpClient: HttpClient) { }

  getAllPhotos():  Observable<any>{
   return this.httpClient.get(`${this.mainUrl}galleries.getPhotos`, {
    params: {
      api_key: environment.userKey,
      gallery_id: environment.gallery_id,
      extras: "url_l",
      format: "json",
      nojsoncallback: 1
    },
  })
  }

  searchForPhotos(searchValue: string){
    return this.httpClient.get(`${this.mainUrl}photos.search`, {
      params: {
        api_key: environment.userKey,
        text: searchValue,
        extras: "url_l",
        format: "json",
        nojsoncallback: 1
      },
    })
  }

  getPhotoDetails(idPhoto: string){
    return this.httpClient.get(`${this.mainUrl}photos.getInfo`, {
      params: {
        api_key: environment.userKey,
        photo_id: idPhoto,
        format: "json",
        nojsoncallback: 1
      },
    }) 
  }
}
