import { GeocoderUiPage } from './app.po';

describe('geocoder-ui App', () => {
  let page: GeocoderUiPage;

  beforeEach(() => {
    page = new GeocoderUiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
