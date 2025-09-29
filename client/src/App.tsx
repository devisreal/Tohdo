import { Button } from "@/components/ui/button";

import "./styles/App.css";

function App() {
  return (
    <div className="p-10">
      <h1>
        Vite react template with{" "}
        <span className="typescript font-mono">TypeScript</span>
      </h1>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Button variant="secondary" className="border shadow-sm">
        Hello
      </Button>
    </div>
  );
}

export default App;
