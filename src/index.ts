import { parseRowsToString, sendMail } from './utils';
import { parserSettings, parsers } from './const';
import type { ParserSettings } from './types';
import { createDatabaseConnection, addDataToDatabase, getAllDatabaseData } from './database';

export default async (verbose: boolean = false, settings: ParserSettings = parserSettings): Promise<void> => {
  const { games, platforms, count } = settings;
  const databaseRows = await Promise.all(
    parsers.map(async (parser) => {
      const parseredData = await parser(games, platforms, count, verbose);
      return parseredData;
    }),
  );
  const db = createDatabaseConnection();
  const databaseData = await getAllDatabaseData(db);
  const resultsStr = parseRowsToString(databaseRows.flat(), databaseData);
  await addDataToDatabase(db, databaseRows.flat());
  db.destroy();
  sendMail(resultsStr);
  if (verbose) {
    console.info(`\n\nParsed statistic:\n${resultsStr}`);
  }
};
