import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { AboutRoutingModule } from "./about-routing.module";
import { AboutComponent } from "./about.component";

@NgModule({
	declarations: [AboutComponent],
	imports: [
		CommonModule,
		MatButtonModule,
		AboutRoutingModule
	]
})
export class AboutModule {
}
