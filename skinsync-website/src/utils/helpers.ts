// Utility functions for the SkinSync application

/**
 * Formats a price to a string with a dollar sign and two decimal places.
 * @param price - The price to format.
 * @returns A formatted price string.
 */
export const formatPrice = (price: number): string => {
    return `$${price.toFixed(2)}`;
};

/**
 * Validates if a given string is a valid email format.
 * @param email - The email string to validate.
 * @returns True if the email is valid, otherwise false.
 */
export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Capitalizes the first letter of each word in a string.
 * @param str - The string to capitalize.
 * @returns The capitalized string.
 */
export const capitalizeWords = (str: string): string => {
    return str.replace(/\b\w/g, char => char.toUpperCase());
};

/**
 * Generates a unique identifier for a user or product.
 * @returns A unique identifier string.
 */
export const generateUniqueId = (): string => {
    return 'id-' + Math.random().toString(36).substr(2, 16);
};