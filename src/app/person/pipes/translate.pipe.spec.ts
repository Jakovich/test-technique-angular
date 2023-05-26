import { TranslatePipe } from "./translate.pipe";

describe("GenderTranslatePipe", () => {
  let pipe: TranslatePipe;

  beforeEach(() => {
    pipe = new TranslatePipe();
  });
  it("should create an instance", () => {
    expect(pipe).toBeTruthy();
  });

  describe("transform", () => {
    it("should return french translate if no language passed if the translate existe", () => {
      expect(pipe.transform("Male")).toBe("Home");
    });

    it("should return translate for the language passed if the tranlsate existe", () => {
      expect(pipe.transform("Male", "it")).toBe("Uomo");
    });

    it("should return initial value if the tranlsate does not existe", () => {
      expect(pipe.transform("bubu")).toBe("bubu");
    });
  });
});
