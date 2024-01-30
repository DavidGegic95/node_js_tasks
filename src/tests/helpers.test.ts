import { validateInput } from "../helpers";

describe("Helpers unit test", () => {
  it("Validate Input", () => {
    const result = validateInput({ year: 2024, country: "FR" });

    expect(result).toBe(true);
  });

  it("Validate inout error check 20-21", () => {
    try {
      validateInput({ year: 2024, country: "QQ" });
      fail("Expected an error to be thrown for non-current year");
    } catch (error: any) {
      expect(error.message).toEqual(
        `Country provided is not supported, received: QQ`
      );
    }
  });

  it("Validate inout error check 24-25", () => {
    try {
      validateInput({ year: 9999, country: "FR" });
      fail("Expected an error to be thrown for non-current year");
    } catch (error: any) {
      expect(error.message).toEqual(
        `Year provided not the current, received: 9999`
      );
    }
  });

  it("Shorten Public Holiday", () => {
    try {
      validateInput({ year: 2023, country: "FR" });
      fail("Expected an error to be thrown for non-current year");
    } catch (error: any) {
      expect(error.message).toEqual(
        `Year provided not the current, received: ${2023}`
      );
    }
  });
});
