import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { GenerationConfig } from "../models/generation-config";
import { Person } from "../models/person";

@Injectable({
  providedIn: "root",
})
export class PersonService {
  constructor(private http: HttpClient) {}

  getPersons(config: GenerationConfig): Observable<Person[]> {
    return this.http
      .get<Person[]>("/assets/data/persons.json")
      .pipe(
        map((persons) =>
          persons
            .filter((el) => config[el.gender.toLowerCase()])
            .slice(0, config.count)
        )
      );
  }
}
