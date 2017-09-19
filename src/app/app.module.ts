import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Jsonp, JsonpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { GridModule } from '@progress/kendo-angular-grid';

import { AppComponent } from './app.component';
import { EditService } from './edit.service';
import { DataTableModule } from 'primeng/primeng';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    JsonpModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    GridModule,
    DataTableModule
  ],
  providers: [
    {
      deps: [Jsonp],
      provide: EditService,
      useFactory: (jsonp: Jsonp) => () => new EditService(jsonp)
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
