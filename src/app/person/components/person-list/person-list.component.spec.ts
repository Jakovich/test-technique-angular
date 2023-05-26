import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { Spectator } from "@ngneat/spectator";
import { createComponentFactory } from "@ngneat/spectator/jest";
import { EMPTY, of, take } from "rxjs";
import { GenerationConfig } from "../../models/generation-config";
import { Person } from "../../models/person";
import { PersonService } from "../../services/person.service";
import { PersonGeneratorComponent } from "../person-generator/person-generator.component";
import { PersonListComponent } from "./person-list.component";
describe("PersonListComponent", () => {
  let spectator: Spectator<PersonListComponent>;
  const personServiceMock = {
    getPersons: jest.fn(),
  };
  const createComponent = createComponentFactory({
    component: PersonListComponent,
    declarations: [PersonListComponent, PersonGeneratorComponent],
    imports: [
      MatTableModule,
      MatCheckboxModule,
      MatPaginatorModule,
      MatInputModule,
      MatButtonModule,
      ReactiveFormsModule,
      NoopAnimationsModule,
    ],
    providers: [{ provide: PersonService, useValue: personServiceMock }],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  test("should create", () => {
    expect(spectator.component).toBeTruthy();
  });

  describe("generate", () => {
    const config: GenerationConfig = { count: 3, male: true, female: false };
    const people: Person[] = [
      {
        id: 1,
        firstName: "Jhon",
        lastName: "Glubibulga",
        email: "@",
        gender: "Male",
      },
    ];

    beforeEach(() => {
      personServiceMock.getPersons.mockReturnValue(of(people));
    });
    test("should call getPersons of person service", () => {
      spectator.component.generate(config);
      expect(personServiceMock.getPersons).toHaveBeenCalledTimes(1);
      expect(personServiceMock.getPersons).toHaveBeenCalledWith(config);
    });

    test("should set the datasource", () => {
      expect(spectator.component.data).toEqual(EMPTY);
      let receivedData;
      spectator.component.generate(config);

      spectator.component.data
        .pipe(take(1))
        .subscribe((val) => (receivedData = val));
      expect(receivedData).toEqual(people);
      expect(spectator.component.dataSource.data).toEqual(people);
    });
  });
});
