import {Collection} from "mongodb";
import {mocked} from "ts-jest/utils";

export const getMockedCollection = (collectionFunction: () => Collection) => {
  const mockUserCollection = {
    findOne: jest.fn(),
    insertOne: jest.fn()
  } as Partial<Collection>;
  mocked(collectionFunction, true).mockImplementation(() => mockUserCollection as Collection);

  return mockUserCollection;
};
