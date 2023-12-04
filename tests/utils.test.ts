import { describe, it, expect } from 'vitest';
import userAgents from '../src/const/userAgents';
import { getRandomUserAgent } from '../src/utils';

describe('Test utils', () => {
  it('getRandomUserAgent', () => {
    const value = getRandomUserAgent();
    expect(userAgents.includes(value)).toBeTruthy();
  });
});
