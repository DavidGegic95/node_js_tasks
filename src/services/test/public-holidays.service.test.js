import axios from 'axios';
import {
    getListOfPublicHolidays,
    checkIfTodayIsPublicHoliday,
    getNextPublicHolidays,
} from '../public-holidays.service'


jest.mock('axios');

describe('task 1 public holidays service unit tests', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should get list of public holidays for a specific year and country', async () => {
        const mockData = [{ /* Mocked PublicHoliday object */ }];
        axios.get.mockResolvedValue({ data: mockData });

        const result = await getListOfPublicHolidays(2024, 'US');

        expect(result).toEqual([/* Expected result based on your mockData and shortenPublicHoliday function */]);
        expect(axios.get).toHaveBeenCalledWith(`${PUBLIC_HOLIDAYS_API_URL}/PublicHolidays/2024/US`);
    });
})