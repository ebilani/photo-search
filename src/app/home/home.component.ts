import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PhotosService } from '../services/photos.service';
import { debounceTime, distinctUntilChanged, finalize, map, switchMap, takeUntil, tap} from 'rxjs/operators';
import { Photo, PhotosList } from '../models/photos';
import { from, of, Subject } from 'rxjs';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild('searchbar') searchbar!: ElementRef;
  searchText: string = '';
  toggleSearch: boolean = false;
  isLoadingResults: boolean = true;
  imageObject: Array<{ image: string; title: string }> = [];
  photoListArr: Photo[] = [];
  selectedImageIndex: number = -1;
  showFlag: boolean = false;
  selectedImageId!: string;
  showDetails: boolean = false;
  private onComponentDestroy: Subject<void> = new Subject<void>();
  constructor(private photosService: PhotosService) {}

  ngOnInit(): void {
    this.getAllPhotos();
  }

  openSearch() {
    this.toggleSearch = true;
    this.searchbar.nativeElement.focus();
  }
  searchClose() {
    this.searchText = '';
    this.toggleSearch = false;
  }
  getAllPhotos() {
    this.photosService
      .getAllPhotos()
      .pipe(
        tap((response: PhotosList) => {
          this.photoListArr = response.photos.photo;
          const data = response.photos.photo.map((obj) => ({
            id: obj.id,
            image: obj.url_l,
            title: obj.title,
          }));
          this.imageObject = data;
        }),

        finalize(() => (this.isLoadingResults = false)),
        takeUntil(this.onComponentDestroy)
      )
      .subscribe();
  }
  imageClick(imageProp: { nr: number; imageId: string }) {
    this.selectedImageIndex = imageProp.nr;
    this.selectedImageId = imageProp.imageId;
    this.showFlag = true;
    this.showDetails = true;
  }
  closeEventHandler() {
    this.showFlag = false;
    this.showDetails = false;
    this.selectedImageIndex = -1;
  }
  onSearch(event: any) {
    this.imageObject = [];
    this.photoListArr = [];
    this.isLoadingResults = true;
    of(event)
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((t) =>
          t.length >= 3
            ? from(
                this.photosService.searchForPhotos(event.replaceAll(' ', '+'))) /* replace space with + on query params */
            : of([])
        ),
        map((response: any) => {
          if (response && response.photos && response.photos.photo.length) {
            this.photoListArr = response.photos.photo;
            response.photos.photo = response.photos.photo.map((obj: any) => ({
              id: obj.id,
              image: obj.url_l,
              title: obj.title,
            }));
            return response;
          } else {
            this.photoListArr = [];
          }
        }),
        tap((el) => {
          if (el && el.photos && el.photos.photo.length) {
            this.imageObject = el.photos.photo;
          } else {
            this.imageObject = [];
          }
        }),
        finalize(() => (this.isLoadingResults = false)),
        takeUntil(this.onComponentDestroy)
      )
      .subscribe();
  }
  closeDetails() {
    this.showDetails = false;
  }
  ngOnDestroy(){
    this.onComponentDestroy.next();
    this.onComponentDestroy.complete();
  }
}
