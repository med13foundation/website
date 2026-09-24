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
import Champions from "@/pages/Champions";
import Symposium from "@/pages/Symposium";
import WhoWeAre from "@/pages/WhoWeAre";
import NewsAndEvents from "@/pages/NewsAndEvents";
import Roadmap from "@/pages/Roadmap";
import GetInvolved from "@/pages/GetInvolved";
import WaysToGive from "@/pages/WaysToGive";
import HopeIsAPractice from "@/pages/HopeIsAPractice";
import DenverMiniMeetup from "@/pages/DenverMiniMeetup";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home}/>
      <Route path="/admin" component={Admin}/>
      <Route path="/newsletter/:id" component={NewsletterView}/>
      <Route path="/unsubscribe" component={Unsubscribe}/>
      <Route path="/gala" component={Gala}/>
      <Route path="/champions" component={Champions}/>
      <Route path="/symposium" component={Symposium}/>
      <Route path="/who-we-are" component={WhoWeAre}/>
      <Route path="/news-and-events" component={NewsAndEvents}/>
      <Route path="/news-and-events/hope-is-a-practice" component={HopeIsAPractice}/>
      <Route path="/news-and-events/denver-mini-medopathies-meetup" component={DenverMiniMeetup}/>
      <Route path="/roadmap" component={Roadmap}/>
      <Route path="/get-involved" component={GetInvolved}/>
      <Route path="/ways-to-give" component={WaysToGive}/>
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
