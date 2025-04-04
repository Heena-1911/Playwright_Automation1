class LoginPage {
  constructor(page) {
    this.page = page;

    this.emailAddress = "//input[@name='email']";
    this.password = "//input[@type='password']";
    this.checkRememberme = "//input[@name='rememberMe']";
    this.loginbtn = "//button[@type='submit']";
  }

  async openurl() {
    await this.page.goto("https://staging.barucabinets.com/sign-in");
  }

  async Login(emailAddress, pwd) {
    await this.page.fill(this.emailAddress, emailAddress);
    await this.page.fill(this.password, pwd);
    await this.page.click(this.loginbtn);
  }
}

module.exports = LoginPage;
