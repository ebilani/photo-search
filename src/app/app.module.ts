import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgImageFullscreenViewModule } from 'ng-image-fullscreen-view';
import { HomeComponent } from './home/home.component';
import { CustomCardComponent } from './components/custom-card/custom-card.component';
import { PhotoDetailsComponent } from './components/photo-details/photo-details.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, CustomCardComponent, PhotoDetailsComponent],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    NgImageFullscreenViewModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
