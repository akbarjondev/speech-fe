import { Messages } from "./components/Messages";
import { Record } from "./components/Record";
import { useSocket } from "./hook/useSocket";
import { ErrorBoundary } from "react-error-boundary";
import { Toaster } from "react-hot-toast";

function App() {
  const { connected } = useSocket();

  return (
    <section className="flex flex-col h-screen p-2">
      <div className="flex items-center justify-center gap-1 mb-10">
        <h1 className="font-bold text-4xl text-center">
          Speech Bot | Uzb &gt; Eng
        </h1>
        <span
          className={`w-2 h-2 inline-flex rounded-full ${connected ? "bg-green-500" : "bg-red-500"}`}
        ></span>
      </div>

      <Toaster />
      <ErrorBoundary fallback={<p>Error occured, try again later</p>}>
        <Messages />
        <Record />
      </ErrorBoundary>
    </section>
  );
}

export default App;
