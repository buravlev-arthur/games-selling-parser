import { parserSettings, parsers } from './const';
import type { ParserSettings } from './types';
import { createDatabaseConnection, addDataToDatabase } from './database';

export default async (verbose: boolean = false, settings: ParserSettings = parserSettings): Promise<void> => {
  const { games, platforms, count } = settings;
  const databaseRows = await Promise.all(
    parsers.map(async (parser) => {
      const parseredData = await parser(games, platforms, count, verbose);
      return parseredData;
    }),
  );
  const db = createDatabaseConnection();
  await addDataToDatabase(db, databaseRows.flat());
  db.destroy();
};
