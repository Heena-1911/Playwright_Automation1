const { expect } = require('@playwright/test');

class Myacc {
  constructor(page) {
    this.page = page;

    this.Myaccmenu = "//button[normalize-space()='My Account']";
    this.Customer_Businessname = "//input[@placeholder='Business Name']";
    this.Customer_Type = "//div[@id='mui-component-select-businessType']";
    this.Businessregistration_license = "//input[@placeholder='Registration/License number']";
    this.First_Name = "//input[@placeholder='First Name']";
    this.Last_Name = "//input[@placeholder='Last Name']";
    this.Email = "//input[@placeholder='Email']";
    this.Phone_Number = "//input[@placeholder='Phone Number']";
    this.btnsave = "//button[@type='submit']";
    this.successmsg = "//div[contains(text(), 'Data updated successfully')]";
  }

  async Customer_Info(CustomerBusinessname, CustomerType, Businessregistrationlicense, FirstName, LastName, Email, PhoneNumber) {
    await this.page.click(this.Myaccmenu);

    // Validate input values before filling the fields
    if (!CustomerBusinessname) throw new Error("Customer Business Name is missing!");
    if (!CustomerType) throw new Error("Customer Type is missing!");

    await this.page.fill(this.Customer_Businessname, CustomerBusinessname);

    // Handle Dropdown Selection
    await this.page.click(this.Customer_Type);
    const optionXPath = `//li[normalize-space()='${CustomerType}']`;  
    await this.page.click(optionXPath);

    await this.page.fill(this.Businessregistration_license, Businessregistrationlicense);
    await this.page.fill(this.First_Name, FirstName);
    await this.page.fill(this.Last_Name, LastName);

    // Check if the email field is disabled before filling
    if (!(await this.page.isDisabled(this.Email))) {
      await this.page.fill(this.Email, Email);
    } else {
      console.log("Email field is disabled, skipping fill...");
    }

    await this.page.fill(this.Phone_Number, PhoneNumber);
    await this.page.click(this.btnsave);

    // Validate success message
    await this.page.waitForSelector(this.successmsg, { timeout: 5000 });
  }
}

module.exports = Myacc;
