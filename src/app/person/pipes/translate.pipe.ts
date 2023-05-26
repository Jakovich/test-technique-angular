import { Pipe, PipeTransform } from "@angular/core";
import { TRANSLATE } from "../constants/translate.constant";

@Pipe({
  name: "translate",
})
export class TranslatePipe implements PipeTransform {
  transform(value: string, lang = "fr"): string {
    return TRANSLATE[lang]?.[value] || value;
  }
}
