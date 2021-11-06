import {Response} from "express";

export const mockResponse = () => {
  return {
    status: jest.fn().mockImplementation(() => {
      return this;
    }),
    send: jest.fn().mockImplementation(() => {
      return this;
    }),
  } as Partial<Response>;
};
