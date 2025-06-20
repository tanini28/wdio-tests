class DuoSitePage {
  async open() {
    return browser.url('https://duo.ua/');
  }

  get salaryLink() {
    return $('a[href="https://jobs.dou.ua/salaries/"]');
  }

  get jobsLink() {
    return $('a[href="https://jobs.dou.ua/"].sel');
  }

  get relocateLink() {
    return $('a[aria-label=" DOU Logo"]');
  }

  get quartileHeader() {
    return $('h3=I Квартиль');
  }

  get findButton() {
    return $('input.btn-search[type="submit"][value="Знайти"]');
  }

  get newsLink() {
    return $('a[href="https://dou.ua/lenta/news/?from=fpnews"]');
  }

  get blogsLink() {
    return $('a[href="https://dou.ua/forums/blogs/?from=fpcol"]');
  }

  get popularForumLink() {
    return $('a[href="https://dou.ua/forums/?from=fptopics"]');
  }

  async goToSalaries() {
    await this.salaryLink.waitForClickable();
    await this.salaryLink.click();
    await this.quartileHeader.waitForDisplayed();
  }

  async goToJobs() {
    await this.jobsLink.waitForClickable();
    await this.jobsLink.click();
    await this.findButton.waitForDisplayed();
  }

  async goToRelocate() {
    await this.relocateLink.waitForClickable();
    await this.relocateLink.click();
    await browser.waitUntil(async () => (await browser.getUrl()) === 'https://dou.ua/', {
      timeout: 5000,
      timeoutMsg: 'Expected to be on the DOU homepage',
    });
    await this.newsLink.waitForDisplayed();
    await this.blogsLink.waitForDisplayed();
    await this.popularForumLink.waitForDisplayed();
  }
}

export default new DuoSitePage();
