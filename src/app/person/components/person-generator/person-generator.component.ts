import { animate, style, transition, trigger } from "@angular/animations";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from "@angular/forms";
import { GenerationConfig } from "../../models/generation-config";

@Component({
  selector: "app-person-generator",
  templateUrl: "./person-generator.component.html",
  styleUrls: ["./person-generator.component.scss"],
  animations: [
    trigger("inAnimation", [
      transition(":enter", [
        style({ bottom: "30px", opacity: 0 }),
        animate("300ms ease-out", style({ bottom: "5px", opacity: 1 })),
      ]),
    ]),
  ],
})
export class PersonGeneratorComponent implements OnInit {
  generator: FormGroup;

  @Output()
  generateRequest = new EventEmitter<GenerationConfig>();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.generator = this.formBuilder.group(
      {
        count: [1000, [Validators.min(0), Validators.max(1000)]],
        male: [true],
        female: [true],
      },
      {
        validators: this.gendreValidator,
      }
    );

    // On peut egalement forcer la valeur de champ count
    // pour que l'utilisateur ne puisse pas du tout saisir des valeurs incorrects

    /* 
    const countControl = this.generator.get("count");
    countControl.valueChanges.pipe(takeUntill(this.destroyed)).subscribe((value) => {
      if (value > 1000) {
        countControl.setValue(1000);
      } else if (value < 0) {
        countControl.setValue(0);
      }
    }); 
    */
  }

  generate() {
    const value: GenerationConfig = this.generator.value;
    if (this.generator.valid) this.generateRequest.emit(value);
  }

  /**
   * Allow to check if at least on gendre checkbox was checked
   * @param form
   * @returns Error if no one gendre selectes
   */
  private gendreValidator(form: FormGroup): ValidationErrors {
    const male = form.controls["male"].value;
    const female = form.controls["female"].value;

    return male || female ? null : { missGender: true };
  }
}
