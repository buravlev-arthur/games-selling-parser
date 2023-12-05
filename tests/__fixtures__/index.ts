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
};
