class HomePage {
    constructor(page) {
        this.page = page;
        this.productList = '//*[@id="tbodyid"]/div/div/div/h4/a'; // List of product names
        this.addToCartbtn = '//a[normalize-space()="Add to cart"]'; // Add to cart button
        this.cart = '#cartur'; // Cart button
    }

    async addProductToCart(productName) {
        const productList = await this.page.$$(this.productList); // Gets the list of products

        for (const product of productList) {
            if (productName === (await product.textContent()).trim()) { // Finds the correct product
                await product.click(); // Clicks the product
                break;
            }
        }

        this.page.on('dialog', async (dialog) => {
            if (dialog.message().includes('added')) {
                await dialog.accept(); // Handles the confirmation pop-up
            }
        });

        await this.page.locator(this.addToCartbtn).click(); // Clicks 'Add to cart'
    }

    async gotoCart() {
        await this.page.locator(this.cart).click(); // Clicks the Cart button
    }
}

export { HomePage };
