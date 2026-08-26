import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import Admin from "@/pages/Admin";
import NewsletterView from "@/pages/NewsletterView";
import Unsubscribe from "@/pages/Unsubscribe";
import Gala from "@/pages/Gala";
import Symposium from "@/pages/Symposium";
import WhoWeAre from "@/pages/WhoWeAre";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home}/>
      <Route path="/admin" component={Admin}/>
      <Route path="/newsletter/:id" component={NewsletterView}/>
      <Route path="/unsubscribe" component={Unsubscribe}/>
      <Route path="/gala" component={Gala}/>
      <Route path="/symposium" component={Symposium}/>
      <Route path="/who-we-are" component={WhoWeAre}/>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
