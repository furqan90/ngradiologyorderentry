import { NgradiologyorderentryPage } from './app.po';

describe('ngradiologyorderentry App', () => {
  let page: NgradiologyorderentryPage;

  beforeEach(() => {
    page = new NgradiologyorderentryPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
