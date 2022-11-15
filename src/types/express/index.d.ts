import "express";

declare module "express" {
  export interface Request {
    parsedFiles?: string[];
  }
}
