import { create } from "zustand";
import type { IMessage } from "../types";

interface IRecordingState {
  messages: IMessage[];
  isWaitingAnswer: boolean;
}

interface IRecordingActions {
  setMessages: (message: IMessage) => void;
  setWaitingAnswer: (isWaitingAnswer: boolean) => void;
}

type Store = IRecordingState & IRecordingActions;

export const useRecordingStore = create<Store>((set) => ({
  messages: [],
  isWaitingAnswer: false,
  setMessages(message) {
    set((state) => ({ messages: [...state.messages, message] }));
  },
  setWaitingAnswer(isWaitingAnswer) {
    set({
      isWaitingAnswer,
    });
  },
}));
