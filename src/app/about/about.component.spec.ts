import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { RouterTestingModule } from "@angular/router/testing";

import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { AboutRoutingModule } from "./about-routing.module";
import { AboutComponent } from "./about.component";

describe("AboutComponent", () => {

	let spectator: Spectator<AboutComponent>;
	const createComponent = createComponentFactory({
		component: AboutComponent,
		declarations: [
			AboutComponent
		],
		imports: [
			CommonModule,
			MatButtonModule,
			AboutRoutingModule,
			RouterTestingModule.withRoutes([])
		],
	});

	beforeEach(() => {
		spectator = createComponent();
	});


	test('should create', () => {
		expect(spectator.component).toBeTruthy();
	});


});

