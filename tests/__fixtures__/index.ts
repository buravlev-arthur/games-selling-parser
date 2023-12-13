export const binaryResponse = {
  withComporessing: {
    response: Buffer.from([
      31, 139, 8, 0, 0, 0, 0, 0, 0, 3, 100, 141, 193, 10, 131, 48, 16, 68, 127, 101, 217, 115, 43, 53, 82, 73, 253, 0,
      79, 237, 73, 122, 42, 61, 172, 38, 148, 5, 77, 36, 89, 11, 69, 252, 247, 18, 5, 41, 244, 54, 188, 25, 222, 204,
      56, 250, 40, 208, 121, 99, 177, 2, 44, 138, 188, 84, 120, 0, 236, 252, 228, 36, 124, 18, 187, 59, 22, 107, 160,
      17, 18, 27, 127, 58, 160, 182, 13, 246, 205, 36, 236, 221, 58, 108, 82, 59, 246, 212, 217, 136, 21, 60, 230, 45,
      131, 163, 97, 149, 223, 152, 6, 78, 147, 222, 187, 23, 203, 180, 93, 30, 245, 41, 203, 117, 145, 120, 76, 23, 137,
      213, 189, 15, 108, 104, 103, 127, 87, 245, 117, 245, 144, 236, 26, 117, 206, 46, 74, 151, 184, 60, 151, 47, 0, 0,
      0, 255, 255, 3, 0, 32, 36, 157, 33, 212, 0, 0, 0,
    ]),
    text: '{"post code": "33162", "country": "United States", "country abbreviation": "US", "places": [{"place name": "Miami", "longitude": "-80.183", "state": "Florida", "state abbreviation": "FL", "latitude": "25.9286"}]}',
    json: {
      'post code': '33162',
      country: 'United States',
      'country abbreviation': 'US',
      places: [
        {
          'place name': 'Miami',
          longitude: '-80.183',
          state: 'Florida',
          'state abbreviation': 'FL',
          latitude: '25.9286',
        },
      ],
    },
  },
  withoutCompressing: {
    response: Buffer.from([
      91, 123, 34, 105, 100, 34, 58, 51, 56, 44, 34, 112, 101, 114, 115, 111, 110, 73, 100, 34, 58, 50, 52, 44, 34, 116,
      101, 120, 116, 34, 58, 34, 208, 154, 208, 176, 209, 130, 208, 181, 208, 179, 208, 190, 209, 128, 208, 184, 209,
      135, 208, 181, 209, 129, 208, 186, 208, 184, 32, 208, 191, 209, 128, 208, 190, 209, 130, 208, 184, 208, 178, 32,
      208, 186, 208, 176, 209, 129, 209, 130, 209, 128, 208, 176, 209, 134, 208, 184, 208, 184, 46, 32, 208, 149, 209,
      129, 208, 187, 208, 184, 32, 208, 183, 208, 176, 208, 177, 208, 190, 208, 187, 208, 181, 208, 181, 209, 130, 32,
      45, 32, 208, 191, 209, 128, 208, 184, 208, 189, 209, 134, 208, 184, 208, 191, 208, 184, 208, 176, 208, 187, 209,
      140, 208, 189, 208, 190, 32, 208, 187, 208, 181, 209, 135, 208, 184, 209, 130, 209, 140, 32, 208, 189, 208, 181,
      32, 208, 177, 209, 131, 208, 180, 208, 181, 209, 130, 46, 34, 44, 34, 99, 114, 101, 97, 116, 101, 100, 65, 116,
      34, 58, 34, 49, 52, 49, 56, 49, 54, 57, 54, 48, 48, 48, 48, 48, 34, 125, 93,
    ]),
    text: '[{"id":38,"personId":24,"text":"Категорически против кастрации. Если заболеет - принципиально лечить не будет.","createdAt":"1418169600000"}]',
    json: [
      {
        id: 38,
        personId: 24,
        text: 'Категорически против кастрации. Если заболеет - принципиально лечить не будет.',
        createdAt: '1418169600000',
      },
    ],
  },
  htmlContent: {
    response: Buffer.from([
      31, 139, 8, 0, 0, 0, 0, 0, 0, 3, 141, 83, 193, 110, 219, 48, 12, 189, 23, 232, 63, 48, 62, 71, 205, 122, 24, 218,
      1, 118, 128, 174, 11, 182, 2, 29, 90, 160, 41, 176, 161, 232, 129, 182, 153, 136, 131, 44, 105, 18, 157, 52, 127,
      63, 57, 246, 186, 100, 240, 138, 233, 66, 242, 81, 239, 145, 180, 204, 124, 242, 233, 238, 122, 249, 253, 126, 1,
      90, 26, 51, 63, 61, 201, 39, 74, 193, 199, 150, 77, 13, 104, 225, 74, 92, 3, 109, 100, 187, 134, 5, 70, 50, 176,
      114, 1, 68, 19, 60, 84, 100, 9, 62, 7, 244, 26, 110, 185, 12, 24, 118, 160, 212, 192, 127, 226, 21, 24, 129, 155,
      5, 92, 60, 119, 80, 39, 13, 149, 193, 24, 139, 204, 58, 245, 35, 166, 172, 98, 250, 208, 155, 203, 222, 92, 100,
      115, 200, 39, 79, 100, 107, 94, 61, 31, 73, 253, 175, 206, 91, 2, 151, 111, 10, 252, 147, 185, 150, 129, 220, 1,
      163, 10, 123, 170, 82, 127, 209, 53, 97, 157, 44, 164, 147, 55, 36, 8, 149, 198, 16, 73, 138, 172, 149, 149, 74,
      157, 30, 230, 180, 136, 87, 244, 179, 229, 77, 145, 125, 83, 143, 87, 234, 218, 53, 30, 133, 75, 67, 25, 84, 206,
      10, 217, 68, 188, 89, 20, 84, 175, 105, 90, 233, 224, 26, 42, 206, 143, 53, 44, 38, 44, 171, 41, 86, 129, 189,
      176, 179, 7, 204, 177, 155, 27, 166, 173, 119, 65, 178, 62, 213, 159, 87, 198, 150, 107, 209, 69, 77, 27, 174, 72,
      237, 131, 41, 104, 226, 181, 150, 223, 96, 31, 77, 129, 45, 11, 163, 81, 177, 66, 147, 154, 58, 123, 55, 133, 6,
      95, 184, 105, 155, 67, 168, 141, 20, 246, 49, 166, 153, 10, 235, 178, 217, 72, 75, 232, 189, 33, 213, 184, 146,
      147, 217, 82, 169, 18, 160, 42, 244, 120, 252, 29, 118, 20, 199, 6, 26, 101, 71, 65, 105, 163, 42, 49, 85, 151,
      221, 145, 204, 86, 179, 80, 39, 52, 72, 9, 139, 161, 249, 3, 55, 73, 6, 150, 244, 34, 112, 103, 205, 46, 121, 81,
      224, 30, 215, 148, 207, 250, 27, 233, 113, 103, 195, 235, 38, 183, 116, 245, 174, 247, 244, 249, 31, 242, 43, 37,
      129, 251, 164, 159, 47, 53, 71, 240, 9, 4, 73, 233, 152, 118, 8, 5, 98, 79, 144, 174, 90, 149, 182, 173, 36, 8,
      233, 47, 162, 64, 245, 176, 116, 221, 170, 149, 24, 185, 130, 47, 203, 175, 183, 239, 161, 116, 105, 188, 0, 222,
      160, 16, 184, 86, 12, 91, 58, 203, 103, 190, 47, 51, 27, 218, 73, 133, 251, 101, 62, 61, 249, 5, 132, 66, 119,
      186, 224, 3, 0, 0,
    ]),
    headerText: 'Simple Test Page',
    paragraphText: 'This page tests that simple text can be rendered using the basic HTML5 boiler plate outline.',
  },
};

export const parsedStrFromRows = `\
shop: "ggsel", game: "Diablo 4", edition: "Standard", platform: "Steam", offers count: 54
shop: "ggsel", game: "Diablo 4", edition: "Ultimate", platform: "Steam", offers count: 6
total: 60\
`;

export const databaseRows = [
  {
    name: 3,
    edition: 1,
    platform: 2,
    shop: 1,
    price_min: 499,
    price_max: 8499,
    price_avg: 3735,
    offers_count: 54,
    parsed_date: new Date(),
  },
  {
    name: 3,
    edition: 2,
    platform: 2,
    shop: 1,
    price_min: 10309,
    price_max: 11496,
    price_avg: 10847,
    offers_count: 6,
    parsed_date: new Date(),
  },
  {
    name: 4,
    edition: 1,
    platform: 1,
    shop: 1,
    price_min: 153,
    price_max: 6273,
    price_avg: 1535,
    offers_count: 34,
    parsed_date: new Date(),
  },
  {
    name: 4,
    edition: 11,
    platform: 1,
    shop: 1,
    price_min: 445,
    price_max: 4947,
    price_avg: 2037,
    offers_count: 10,
    parsed_date: new Date(),
  },
];
