import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { MatPaginatorIntl } from "@angular/material/paginator";
import { AppComponent } from "./app.component";
import { MatPaginatorIntFr } from "./person/services/mat-paginator.fr";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MatButtonModule,
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: MatPaginatorIntFr }],

  bootstrap: [AppComponent],
})
export class AppModule {}
