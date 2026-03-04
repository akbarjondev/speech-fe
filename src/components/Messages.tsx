import { useRecordingStore } from "../store/useRecordingStore";

export const Messages = () => {
  const messages = useRecordingStore((state) => state.messages);

  return (
    <div className="p-2 border grow flex flex-col overflow-auto">
      {messages.map((message, index) => (
        <p
          key={index}
          className={`mb-1 border rounded p-1 ${message.owner === "client" ? "self-end" : "self-start"}`}
        >
          {message.audioUrl ? (
            <audio controls src={message.audioUrl} />
          ) : (
            message.text
          )}
        </p>
      ))}
    </div>
  );
};
