import * as e from "express";

export interface IReq extends e.Request {
  parsedFiles?: string[];
}

export interface WorkerPostData<T> {
  type: "success" | "error";
  message: T;
}

export interface IMessageData {
  shorterThan: number;
  moverMentions: number;
  shakerMentions: number;
  questionsCount: number;
  spamCount: number;
}
