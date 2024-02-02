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

jest.mock("axios");
describe("Public holidays service unit tests", () => {
  it("Get list of public holidays", async () => {
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({
      data: mockedPublicHolidays,
    });
    const result = await getListOfPublicHolidays(2024, "FR");
    const mockedResult: any = mockedPublicHolidays.map((holiday) =>
      shortenPublicHoliday(holiday)
    );
    expect(result).toEqual(mockedResult);
  });

  it("Check if today is public holiday", async () => {
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({
      status: 200,
    });
    const result = await checkIfTodayIsPublicHoliday("FR");

    expect(result).toEqual(true);
  });

  it("Get next public holidays", async () => {
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({
      data: mockedNextPublicHoliday,
    });

    const result = await getNextPublicHolidays("GB");
    const mockedResult = mockedNextPublicHoliday.map((holiday) =>
      shortenPublicHoliday(holiday)
    );

    expect(result).toEqual(mockedResult);
  });
});

