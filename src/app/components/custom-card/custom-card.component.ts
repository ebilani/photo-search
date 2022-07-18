import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { Subject } from 'rxjs';
import { Photo } from 'src/app/models/photos';


@Component({
  selector: 'custom-card',
  templateUrl: './custom-card.component.html',
  styleUrls: ['./custom-card.component.scss'],
})
export class CustomCardComponent implements OnInit {
  private onComponentDestroy: Subject<void> = new Subject<void>();
  @Input() photoList: Photo[] = [];
  @Output() imgClick: EventEmitter<any> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}
  clickOnImage(nr: number, imageId: string){
    this.imgClick.emit({nr, imageId})
  }
  ngOnDestroy(){
    this.onComponentDestroy.next();
    this.onComponentDestroy.complete();
  }
}
