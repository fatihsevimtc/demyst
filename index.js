const axios = require('axios');
const logger = require('./service/logger.js');
const BASE_URL = require('./network.js');

/**
 * Fetches a TODO by its ID from the JSONPlaceholder API.
 * @param {number} todoID - The ID of the TODO to fetch.
 * @returns {Promise<object>} The TODO object.
 * @throws {Error} If there was an error fetching the TODO.
 */
const fetchData = async (todoID) => {
    const url = `${BASE_URL}/${todoID}`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        logger.error(`Error fetching TODO: ${error.message}`);
        throw new Error(`Error fetching TODO: ${error.message}`);
    }
};

/**
 * Fetches and displays information about a number of TODOs.
 * @param {number} numTodos - The number of TODOs to fetch and display.
 */
const displayTodoInfo = async (numTodos) => {
    const promises = [];
    for (let i = 2; i <= numTodos * 2; i += 2) {
        promises.push(fetchData(i));
    }
    // Return the Promise so that it can be awaited in the test
    return Promise.all(promises).then(async todos => {
        for (const todo of todos) {
            console.log(`Title: ${todo.title}\nCompleted: ${todo.completed}\ntodoID: ${todo.id}\n\n`);
            //logger.info(`Title: ${todo.title}Completed: ${todo.completed}`);
        }
    }).catch(error => {
        logger.error(error.message);
        throw error;
    });
};


// Fetch and display the first 20 even-numbered TODOs.
displayTodoInfo(20);
