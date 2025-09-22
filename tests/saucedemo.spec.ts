import { test, expect } from '@playwright/test';

test.describe('Sauce Demo Hybrid Tests', () => {
    // Test data
    const credentials = {
        username: 'standard_user',
        password: 'secret_sauce'
    };

    // Product to add to cart
    const productData = {
        id: '4',
        name: 'Sauce Labs Backpack'
    };

    test('Login and add one product to cart', async ({ page }) => {
        // 1. Login
        await page.goto('https://www.saucedemo.com/v1/');
        await page.fill('#user-name', credentials.username);
        await page.fill('#password', credentials.password);
        await page.click('#login-button');

        // 2. Add one product to cart using localStorage (simulating API)
        await page.evaluate(({ id }) => {
            // Clear existing cart
            localStorage.clear();
            
            // Add single product
            localStorage.setItem(`cart-${id}`, '1');
            
            // Update cart badge
            const cartBadge = document.querySelector('.shopping_cart_badge') || 
                document.createElement('span');
            cartBadge.className = 'shopping_cart_badge';
            cartBadge.textContent = '1';
            
            const cartLink = document.querySelector('.shopping_cart_container');
            cartLink?.appendChild(cartBadge);
        }, productData);

        // 3. Refresh and navigate to cart
        await page.reload();
        await page.click('.shopping_cart_link');

        // 4. Verify cart contents
        const cartItems = await page.locator('.cart_item').count();
        expect(cartItems).toBe(1);
        
        // 5. Verify the specific product is in cart
        await expect(page.locator('.inventory_item_name')).toContainText(productData.name);
        
        // 6. Verify cart badge shows '1'
        await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    });
});