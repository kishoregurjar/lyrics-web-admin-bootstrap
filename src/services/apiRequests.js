// src/services/httpService.js

import axios from "axios";

const httpInstance = axios.create({
    // baseURL: "http://localhost:3007/api/v1",
    baseURL: "https://lyricsweb.com/api/v1",
});

/**
 * Updates the Axios instance configuration dynamically.
 *
 * @param {Object} newConfig - New configuration settings to be merged.
 */
export function updateHttpConfig(newConfig) {
    Object.assign(httpInstance.defaults, newConfig);
}

/**
 * Makes an HTTP request using the Axios instance with dynamic method and optional additional configuration.
 *
 * @param {string} method - The HTTP method to use for the request (e.g., 'GET', 'POST', 'PUT', 'DELETE').
 * @param {string} endpoint - The endpoint to send the request to.
 * @param {Object} [data={}] - The data to be sent in the request body (for POST, PUT, PATCH).
 * @param {Object} [config={}] - Optional configuration for the request.
 * @returns {Promise} - Axios promise for the HTTP request.
 */
export async function makeRequest(method, endpoint, data = {}, config = {}) {
    try {
        // Handle different HTTP methods
        switch (method.toUpperCase()) {
            case "GET":
                return await httpInstance.get(endpoint, { params: data, ...config });
            case "POST":
                return await httpInstance.post(endpoint, data, config);
            case "PUT":
                return await httpInstance.put(endpoint, data, config);
            case "DELETE":
                return await httpInstance.delete(endpoint, config);
            case "PATCH":
                return await httpInstance.patch(endpoint, data, config);
            default:
                throw new Error(`Unsupported method: ${method}`);
        }
    } catch (error) {
        console.error(`Error making ${method} request to ${endpoint}:`, error);
        throw error;
    }
}
