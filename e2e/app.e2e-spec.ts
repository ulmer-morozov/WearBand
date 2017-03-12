import { LetterBandPage } from './app.po';

describe('letter-band App', function() {
  let page: LetterBandPage;

  beforeEach(() => {
    page = new LetterBandPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
