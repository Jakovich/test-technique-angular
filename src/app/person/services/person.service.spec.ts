import { HttpMethod, SpectatorHttp } from "@ngneat/spectator";
import { createHttpFactory } from "@ngneat/spectator/jest";
import { Person } from "../models/person";
import { PersonService } from "./person.service";

const PERSONS: Person[] = [
  {
    id: 1,
    firstName: "John",
    lastName: "REESE",
    email: "john@reese.com",
    gender: "male",
  },
  {
    id: 2,
    firstName: "Harold",
    lastName: "FINCH",
    email: "harold@finch.com",
    gender: "female",
  },
  {
    id: 3,
    firstName: "Joss",
    lastName: "CARTER",
    email: "joss@carter.com",
    gender: "male",
  },
];

const DEFAULT_CONFIG = {
  count: 3,
  male: true,
  female: true,
};

describe("PersonService", () => {
  let spectatorHttp: SpectatorHttp<PersonService>;

  const createHttp = createHttpFactory(PersonService);

  beforeEach(() => {
    spectatorHttp = createHttp();
  });

  test("should provide a list of 3 persons", () => {
    expect(spectatorHttp.service.getPersons).toBeTruthy();

    spectatorHttp.service.getPersons(DEFAULT_CONFIG).subscribe();
    spectatorHttp.expectOne("/assets/data/persons.json", HttpMethod.GET);

    spectatorHttp.service.getPersons(DEFAULT_CONFIG).subscribe((element) => {
      expect(element.length).toBe(1);
      expect(element.map((p) => p.id)).toEqual([1, 2, 3]);
    });

    const reqs = spectatorHttp.expectConcurrent([
      { url: "/assets/data/persons.json", method: HttpMethod.GET },
    ]);

    spectatorHttp.flushAll(reqs, [PERSONS]);
  });
});
