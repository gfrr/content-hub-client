import { TwitterPipe } from './twitter.pipe';

describe('TwitterPipe', () => {
  it('create an instance', () => {
    const pipe = new TwitterPipe();
    expect(pipe).toBeTruthy();
  });
});
