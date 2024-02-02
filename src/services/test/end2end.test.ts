import supertest from "supertest";
const app = supertest("https://date.nager.at/api/v3");

describe("Nager.Date API E2E Tests", () => {
  it("should retrieve a list of public holidays for a specific country and year", async () => {
    const country = "FR";
    const year = 2024;

    const response = await app
      .get(`/PublicHolidays/${year}/${country}`)
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
  });

  it("should check if today is a public holiday for a specific country", async () => {
    const country = "FR";

    const response = await app
      .get(`/IsTodayPublicHoliday/${country}`)
      .expect(200 | 204);

    expect(response.status).toBe(200 | 204);
  });
});
