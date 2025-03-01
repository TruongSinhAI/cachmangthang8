import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/Home";
import Timeline from "@/pages/Timeline";
import ChatbotPage from "./components/Chatbot/ChatbotDialog";
import Content from "@/pages/Content";
import Game from "@/pages/Game";
import Navbar from "@/components/Layout/Navbar";
import NotFound from "@/pages/not-found";
import BackgroundMusic from "@/components/BackgroundMusic.tsx";

function Router() {
    return (
    <div className="min-h-screen bg-background">
        <BackgroundMusic playing={false}/>
      <Navbar />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/timeline" component={Timeline} />
        <Route path="/content" component={Content} />
        <Route path="/game" component={Game} />
        <Route path="/chatbot" component={ChatbotPage} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;