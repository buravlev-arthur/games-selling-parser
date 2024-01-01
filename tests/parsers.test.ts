import { describe, it, expect } from 'bun:test';
import { parsers } from '@/const';

describe('Test parsers', () => {
  it('ggselParser', async () => {
    const [ggselParser] = parsers;
    const parsedData = await ggselParser(['Grand Theft Auto 5'], ['steam', 'xbox'], 3, false);
    expect(parsedData).toBeArray();
    expect(parsedData.length).not.toEqual(0);
    expect(parsedData[0].edition).toBeInteger();
    expect(parsedData[0].name).not.toEqual(-1);
    expect(parsedData[0].price_min).not.toBeNegative();
    expect(parsedData[0].price_max).not.toBeNegative();
    expect(parsedData[0].price_avg).not.toBeNegative();
    expect(parsedData[0].price_min <= parsedData[0].price_avg).toBeTrue();
    expect(parsedData[0].price_max >= parsedData[0].price_avg).toBeTrue();
    expect(parsedData[0].offers_count).not.toBeNegative();
    expect(parsedData[0].parsed_date).toBeDate();
  });
});
