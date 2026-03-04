export interface IMessage {
  owner: "server" | "client";
  text?: string;
  audioUrl?: string;
}
