import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { Spectator } from "@ngneat/spectator";
import { createComponentFactory } from "@ngneat/spectator/jest";
import { PersonGeneratorComponent } from "./person-generator.component";

describe("PersonGeneratorComponent", () => {
  let spectator: Spectator<PersonGeneratorComponent>;
  const createComponent = createComponentFactory({
    component: PersonGeneratorComponent,
    declarations: [PersonGeneratorComponent],
    imports: [
      MatCheckboxModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      ReactiveFormsModule,
      NoopAnimationsModule,
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  test("should create", () => {
    expect(spectator.component).toBeTruthy();
  });

  test("should init the generator form", () => {
    expect(Object.keys(spectator.component.generator.controls)).toEqual([
      "count",
      "male",
      "female",
    ]);
  });

  test("should set init value to the generator form", () => {
    expect(spectator.component.generator.get("count").value).toBe(1000);
    expect(spectator.component.generator.get("male").value).toBe(true);
    expect(spectator.component.generator.get("female").value).toBe(true);
  });

  describe("generator form", () => {
    test("should set error to the count controm for the value higher then 1000", () => {
      const countControl = spectator.component.generator.get("count");
      countControl.setValue(1200);
      expect(countControl.valid).toBe(false);
      expect(countControl.errors).toEqual({ max: { max: 1000, actual: 1200 } });
    });

    test("should set error to the count controm for the value less then 0", () => {
      const countControl = spectator.component.generator.get("count");
      countControl.setValue(-2);
      expect(countControl.valid).toBe(false);
      expect(countControl.errors).toEqual({ min: { min: 0, actual: -2 } });
    });

    test("should set error to form if no gender choice has been made", () => {
      const maleControl = spectator.component.generator.get("male");
      const femaleControl = spectator.component.generator.get("female");
      maleControl.setValue(false);
      femaleControl.setValue(false);
      expect(spectator.component.generator.valid).toBe(false);
      expect(spectator.component.generator.errors).toEqual({
        missGender: true,
      });
    });

    test.each([
      [800, true, false],
      [600, false, true],
      [1, true, true],
    ])(
      "should be valid in other cases",
      (countValue, maleValue, femaleValue) => {
        const maleControl = spectator.component.generator.get("male");
        const femaleControl = spectator.component.generator.get("female");
        const countControl = spectator.component.generator.get("count");
        countControl.setValue(countValue);
        maleControl.setValue(maleValue);
        femaleControl.setValue(femaleValue);
        expect(spectator.component.generator.valid).toBe(true);
      }
    );
  });
  describe("generate", () => {
    let generateRequest: jest.SpyInstance;
    beforeEach(
      () =>
        (generateRequest = jest
          .spyOn(spectator.component.generateRequest, "emit")
          .mockImplementation())
    );

    it("should not emit the new value if the generator form is not valid", () => {
      spectator.component.generator.setErrors({ error: true });
      spectator.component.generate();
      expect(generateRequest).not.toHaveBeenCalled();
    });

    it("should emit the new value if the generator form is  valid", () => {
      const formValue = { count: 400, male: true, female: false };
      spectator.component.generator.setValue(formValue);
      spectator.component.generate();
      expect(generateRequest).toHaveBeenCalledTimes(1);
      expect(generateRequest).toHaveBeenCalledWith(formValue);
    });
  });
});
