import { Injectable } from "@angular/core";
import { MatPaginatorIntl } from "@angular/material/paginator";

@Injectable()
export class MatPaginatorIntFr extends MatPaginatorIntl {
  itemsPerPageLabel = "Enregistrement par page";
  nextPageLabel = "Page suivante";
  previousPageLabel = "Page précédente";
  firstPageLabel = "La première page";
  lastPageLabel = "Dernière page";

  getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return "0 de " + length;
    }

    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex =
      startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize;
    return startIndex + 1 + " - " + endIndex + " sur  " + length;
  };
}
