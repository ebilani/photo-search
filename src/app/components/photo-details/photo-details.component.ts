import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { finalize, takeUntil, tap } from 'rxjs/operators';
import { PhotosService } from 'src/app/services/photos.service';

@Component({
  selector: 'photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.scss']
})
export class PhotoDetailsComponent implements OnInit {
@Input() imageId!: string;
imageDetails: any = {};
isLoadingResults: boolean = true;
@Output() onCloseBtn: EventEmitter<any> = new EventEmitter();
private onComponentDestroy: Subject<void> = new Subject<void>();

  constructor(private photoService: PhotosService) { }

  ngOnInit(): void {
    this.getPhotoDetail();
  }
  getPhotoDetail(){
    this.photoService.getPhotoDetails(this.imageId).pipe(
      tap((response:any)=>{
        this.imageDetails = response.photo
        console.log(response, "response details")
      }),
      finalize(()=> this.isLoadingResults = false),
      takeUntil(this.onComponentDestroy)
    ).subscribe() 
  }
  closeDetails(){
    this.onCloseBtn.emit()
  }

  ngOnDestroy(){
    this.onComponentDestroy.next();
    this.onComponentDestroy.complete();
  }
}
