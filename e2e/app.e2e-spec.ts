import { ContentHubPage } from './app.po';

describe('content-hub App', () => {
  let page: ContentHubPage;

  beforeEach(() => {
    page = new ContentHubPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
