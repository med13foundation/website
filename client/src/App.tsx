import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
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
import Med13Syndrome from "@/pages/Med13Syndrome";
import NewsAndEvents from "@/pages/NewsAndEvents";
import Impact from "@/pages/Impact";
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
      <Route path="/what-is-med13-syndrome" component={Med13Syndrome}/>
      <Route path="/news-and-events" component={NewsAndEvents}/>
      <Route path="/news-and-events/hope-is-a-practice" component={HopeIsAPractice}/>
      <Route path="/news-and-events/denver-mini-medopathies-meetup" component={DenverMiniMeetup}/>
      <Route path="/impact" component={Impact}/>
      <Route path="/roadmap"><Redirect to="/impact" /></Route>
      <Route path="/get-involved" component={GetInvolved}/>
      <Route path="/ways-to-give" component={WaysToGive}/>
      <Route component={NotFound} />
    </Switch>
  );
}

function SkipLink() {
  const { t } = useTranslation();
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background focus:outline-none"
      data-testid="link-skip-to-content"
    >
      {t("a11y.skipToContent")}
    </a>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SkipLink />
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
