const axios = require('axios');
const logger = require('../service/logger.js');
const { fetchData, displayTodoInfo } = require('../index.js');
const BASE_URL = require('../network.js');

// Mock the logger.error function
jest.spyOn(logger, 'error');

describe('fetchData', () => {
    it('fetches successfully data from the API', async () => {
        const data = { title: 'Test TODO' };
        axios.get.mockImplementationOnce(() => Promise.resolve({ data: data }));

        await expect(fetchData(2)).resolves.toEqual(data);
        expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/2`);
    });

    it('fetches erroneously data from the API', async () => {
        const errorMessage = 'Network Error';
        axios.get.mockImplementationOnce(() => Promise.reject(new Error(errorMessage)));

        await expect(fetchData(2)).rejects.toThrow(errorMessage);
        expect(logger.error).toHaveBeenCalledWith(`Error fetching TODO: ${errorMessage}`);
    });
});
describe('displayTodoInfo', () => {
    it('displays TODO information correctly', async () => {
        const todoData1 = { id: 1, title: 'First Todo', completed: false };
        const todoData2 = { id: 2, title: 'Second Todo', completed: true };

        // Mock fetchData to return specific todo data for given todoIDs
        jest.spyOn(global, 'fetchData').mockImplementation((todoID) => {
            return Promise.resolve({
                id: todoID,
                title: todoID === 1 ? todoData1.title : todoData2.title,
                completed: todoID === 1 ? todoData1.completed : todoData2.completed,
            });
        });

        // Call displayTodoInfo with multiple todoIDs and wait for it to complete
        await displayTodoInfo(2).then(() => {
            // Check if console.log was called with the correct information for each todo
            expect(console.log).toHaveBeenNthCalledWith(1, `Title: ${todoData1.title}\nCompleted: ${todoData1.completed}\ntodoID: ${todoData1.id}\n\n`);
            expect(console.log).toHaveBeenNthCalledWith(2, `Title: ${todoData2.title}\nCompleted: ${todoData2.completed}\ntodoID: ${todoData2.id}\n\n`);
        });
    });
});