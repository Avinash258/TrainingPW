import { faker } from '@faker-js/faker';

// Types for better type safety
export interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    gender: 'male' | 'female';
}

export interface ProductData {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

// Constants
export const DEFAULT_PASSWORD = 'Test@123';
export const PRODUCTS = {
    LAPTOP: {
        id: '31',
        name: '14.1-inch Laptop',
        price: 1590.00,
        quantity: 1
    },
    HEALTH_BOOK: {
        id: '22',
        name: 'Health Book',
        price: 24.00,
        quantity: 1
    },
    SMARTPHONE: {
        id: '43',
        name: 'Smartphone',
        price: 899.00,
        quantity: 1
    }
} as const;

// Generate a unique email using faker
export const generateUniqueEmail = (firstName?: string, lastName?: string): string => {
    if (firstName && lastName) {
        return faker.internet.email({ firstName, lastName }).toLowerCase();
    }
    return faker.internet.email().toLowerCase();
};

// Generate user data with optional overrides
export const generateUserData = (overrides: Partial<UserData> = {}): UserData => {
    const firstName = overrides.firstName ?? faker.person.firstName();
    const lastName = overrides.lastName ?? faker.person.lastName();

    return {
        firstName,
        lastName,
        email: overrides.email ?? generateUniqueEmail(firstName, lastName),
        password: overrides.password ?? DEFAULT_PASSWORD,
        gender: overrides.gender ?? (faker.number.int(1) === 0 ? 'male' : 'female')
    };
};

// Generate a random product
export const generateRandomProduct = (): ProductData => {
    const productsList = Object.values(PRODUCTS);
    if (productsList.length === 0) {
        throw new Error('No products available');
    }
    return productsList[faker.number.int({ min: 0, max: productsList.length - 1 })];
};

// Generate multiple users
export const generateMultipleUsers = (count: number): UserData[] => {
    if (count < 1) {
        throw new Error('Count must be greater than 0');
    }
    return Array.from({ length: count }, () => generateUserData());
};

// Helper function for custom quantity products
export const getProductWithQuantity = (product: ProductData, quantity: number): ProductData => {
    if (quantity < 1) {
        throw new Error('Quantity must be greater than 0');
    }
    return {
        ...product,
        quantity
    };
};