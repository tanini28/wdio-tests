import GithubSitePage from './../pages/githubSite.page.js';
import DuoSitePage from './../pages/duoSite.page.js';

describe('WebDriver.IO Home Task', () => {
  //1 task
  it('should navigate to webdriver.io', async () => {
    await browser.url('https://webdriver.io/');
    await expect(browser).toHaveUrl('https://webdriver.io/');

    const apiLink = await $('a[href="/docs/api"]');
    await apiLink.click();
    await browser.pause(2000);

    await expect(browser).toHaveUrl('https://webdriver.io/docs/api');

    const introductionElement = await $('.breadcrumbs__link');
    await expect(introductionElement).toBeDisplayed();

    const webDriverLink = await $('a[href="/docs/api/webdriver"]');
    await expect(webDriverLink).toBeExisting();

    let href = await webDriverLink.getAttribute('href');
    console.log('WebDriver link href is: ' + href);
    await expect(webDriverLink).toHaveAttribute('href', '/docs/api/webdriver');
  });

  //2 task
  xit('should interact with search', async () => {
    const searchButton = await $('.DocSearch-Button');
    await searchButton.click();
    await browser.pause(2000);

    const searchInput = await $('#docsearch-input');
    await searchInput.setValue('all is done');
    await browser.pause(2000);

    console.log('Search value is: ' + (await searchInput.getValue()));

    const clearButton = await $('.DocSearch-Reset');
    await clearButton.click();
    await browser.pause(1000);
  });
  //3 task
  xit('should test webdriver.io navigation', async () => {
    await browser.url('https://webdriver.io/');

    const apiLink = await $('//a[@class="footer__link-item" and text()="API Reference"]');
    await expect(apiLink).toBeDisplayed();
    await apiLink.click();

    const blogLink = await $('//a[@class="footer__link-item" and text()="Blog"]');
    await expect(blogLink).toBeDisplayed();
    console.log('Blog is displayed in footer');

    const nextButton = await $('a.pagination-navlink--next[href="/docs/api/protocols"]');
    await expect(nextButton).toBeDisplayed();
    await expect(nextButton).toBeClickable();
    console.log('Next button is visible and clickable');

    await nextButton.click();

    await browser.waitUntil(
      async () => {
        const h2 = await $('h2#webdriver-protocol');
        return await h2.isDisplayed();
      },
      {
        timeout: 10000,
        timeoutMsg: 'Expected "WebDriver Protocol" section to be displayed',
      },
    );

    const protocolTitle = await $('h2#webdriver-protocol');
    console.log('WebDriver Protocol heading appeared:', await protocolTitle.getText());
  });

  //4 task
  it('should check navigation and elements on pages', async () => {
    await DuoSitePage.open();

    await DuoSitePage.goToSalaries();
    await expect(DuoSitePage.quartileHeader).toBeDisplayed();

    await DuoSitePage.goToJobs();
    await expect(DuoSitePage.findButton).toBeDisplayed();

    await DuoSitePage.findButton.click();

    await DuoSitePage.goToRelocate();
    await expect(DuoSitePage.newsLink).toBeDisplayed();
    await expect(DuoSitePage.blogsLink).toBeDisplayed();
    await expect(DuoSitePage.popularForumLink).toBeDisplayed();
  });

  //5 task
  it('should go through the sign-up form up to captcha step', async () => {
    await githubSitePage.open();
    await githubSitePage.goToSignUp();

    const email = `test${Date.now()}@example.com`;
    const username = `user${Math.floor(Math.random() * 100000)}`;

    await githubSitePage.fillSignUpForm({
      email,
      password: 'Example123@qwe',
      username,
      country: 'Croatia',
    });

    const captchaContainer = await $('[data-ct-test="captcha-container"]');
    await expect(captchaContainer).toBeDisplayed();
  });
});
