import { Connection } from "mongoose";

declare global {
  var mongoose: {
    Schema: any;
    conn:Connection | null;
    promise:Promise<Connection> | null;
  };
}
export {}