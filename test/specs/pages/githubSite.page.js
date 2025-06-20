class GithubSitePage {
  async open() {
    await browser.url('https://github.com');
  }

  get signUpButton() {
    return $(
      'a[href="/signup?ref_cta=Sign+up&ref_loc=header+logged+out&ref_page=%2F&source=header-home"]',
    );
  }

  get createAccountText() {
    return $('h1.signups-rebrand__container-h1');
  }

  get emailInput() {
    return $('#email');
  }

  get continueButton() {
    return $('button[type="submit"]');
  }

  get passwordInput() {
    return $('#password');
  }

  get usernameInput() {
    return $('#login');
  }

  get emailPrefCheckbox() {
    return $('#user_signup\\[marketing_consent\\]');
  }

  get finalContinueButton() {
    return $('button.signup-form-fields__button');
  }

  async goToSignUp() {
    await this.signUpButton.waitForClickable();
    await this.signUpButton.click();
    await browser.pause(2000);
  }

  async fillSignUpForm({ email, password, username, country }) {
    await expect(this.createAccountText).toBeDisplayed();
    await expect(this.createAccountText).toHaveTextContaining('Create your free account');

    await this.emailInput.setValue(email);
    await this.continueButton.click();

    await this.passwordInput.waitForDisplayed();
    await this.passwordInput.setValue(password);
    await this.continueButton.click();

    await this.usernameInput.waitForDisplayed();
    await this.usernameInput.setValue(username);
    await this.continueButton.click();

    const countryDropdownToggle = $('button[aria-controls^="select-panel"]');
    await countryDropdownToggle.waitForClickable();
    await countryDropdownToggle.click();

    const countryOption = $(
      `//span[contains(@class, 'ActionListItem-label') and text()="${country}"]`,
    );
    await countryOption.waitForClickable();
    await countryOption.click();

    await this.emailPrefCheckbox.waitForClickable();
    await this.emailPrefCheckbox.click();

    await this.finalContinueButton.waitForClickable();
    await this.finalContinueButton.click();
  }
}

export default new GithubSitePage();
