import { shortenPublicHoliday, validateInput } from "../helpers";
import { mockedPublicHolidays } from "../services/test/mockedData";

describe("Helpers unit test", () => {
  it("Validate Input", () => {
    const result = validateInput({ year: 2024, country: "FR" });

    expect(result).toBe(true);
  });

  it("Validate inout error check 20-21", () => {
    try {
      validateInput({ year: 2024, country: "QQ" });
      fail("Expected an error to be thrown for non-supported country");
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
    const holiday = mockedPublicHolidays[0];
    const result = shortenPublicHoliday(holiday);
    expect(result).toEqual({
      name: holiday.name,
      localName: holiday.localName,
      date: holiday.date,
    });
  });
});
