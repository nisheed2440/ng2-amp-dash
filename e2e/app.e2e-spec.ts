import { PreventDefaultPage } from './app.po';

describe('prevent-default App', () => {
  let page: PreventDefaultPage;

  beforeEach(() => {
    page = new PreventDefaultPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
