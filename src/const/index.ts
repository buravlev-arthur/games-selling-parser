import type { ParserSettings, ParserFunction } from '@/types';
import ggselParser from '@/parsers/ggsel';

export const parserSettings: ParserSettings = {
  games: ['Diablo 4', 'Grand Theft Auto 5', 'Red Dead Redemption 2', 'Minecraft', 'Cyberpunk 2077'],
  platforms: ['steam', 'xbox', 'playstation'],
  count: 100,
};

export const parsers: Array<ParserFunction> = [ggselParser];
