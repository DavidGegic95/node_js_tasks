import axios from "axios";
import {
  checkIfTodayIsPublicHoliday,
  getListOfPublicHolidays,
  getNextPublicHolidays,
} from "../public-holidays.service";
import { shortenPublicHoliday } from "../../helpers";
import {
  mockedNextPublicHoliday,
  mockedPublicHolidays,
  mocked_FR24,
} from "./mockedData";

describe("Public holidays service integration tests", () => {
  it("Get list of public holidays integration test", async () => {
    const result = await getListOfPublicHolidays(2024, "FR");
    const mockedResult = mocked_FR24.map((holiday) =>
      shortenPublicHoliday(holiday)
    );

    expect(result).toEqual(mockedResult);
  });

  it("Check if today is public holiday integration test", async () => {
    const result = await checkIfTodayIsPublicHoliday("FR");

    expect(result).toEqual(false);
  });

  it("Get next public holidays integration test", async () => {
    const result = await getNextPublicHolidays("GB");
    const mockedResult = mockedNextPublicHoliday.map((holiday) =>
      shortenPublicHoliday(holiday)
    );

    expect(result).toEqual(mockedResult);
  });
});
