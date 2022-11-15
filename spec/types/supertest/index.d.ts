import "supertest";
import { IMessageData } from "../../../src/routes/shared/types";

declare module "supertest" {
  export interface Response {
    headers: Record<string, string[]>;
    body: {
      success: boolean;
      message: string | IMessageData;
    };
  }
}
