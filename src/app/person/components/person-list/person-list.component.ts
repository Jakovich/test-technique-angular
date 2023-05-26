import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { EMPTY, Observable, tap } from "rxjs";
import { GenerationConfig } from "../../models/generation-config";
import { Person } from "../../models/person";
import { PersonService } from "../../services/person.service";

@Component({
  selector: "app-person-list",
  templateUrl: "./person-list.component.html",
  styleUrls: ["./person-list.component.scss"],
})
export class PersonListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  displayedColumns: string[] = [
    "id",
    "firstName",
    "lastName",
    "gender",
    "email",
  ];
  dataSource = new MatTableDataSource<Person>();
  data: Observable<Person[]> = EMPTY;

  constructor(private personService: PersonService) {}

  generate(config: GenerationConfig) {
    this.data = this.personService
      .getPersons(config)
      .pipe(tap((data) => (this.dataSource.data = data)));
  }
}
