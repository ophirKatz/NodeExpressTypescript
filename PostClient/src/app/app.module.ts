import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostsComponent } from './components/posts/posts.component';
import { PostBoxComponent } from './components/post-box/post-box.component';
import { PostsService } from './services/posts/posts.service';

import { HttpClientModule } from '@angular/common/http';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { DataProvider } from './services/data/DataProvider';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    PostBoxComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [PostsService, DataProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
