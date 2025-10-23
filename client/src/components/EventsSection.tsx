import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users } from "lucide-react";

export default function EventsSection() {
  return (
    <section id="events" className="py-16 sm:py-24 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4" data-testid="text-events-title">
            Upcoming Events
          </h2>
          <p className="text-lg text-muted-foreground">
            Connect with our community and stay informed
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <Card data-testid="card-family-conference">
            <CardHeader>
              <CardTitle className="text-xl font-heading">MED13 Family Conference 2025</CardTitle>
              <CardDescription className="flex items-center gap-2 mt-2">
                <Calendar className="w-4 h-4" />
                <span>TBD (Target: Fall 2026)</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-2 text-sm">
                  <MapPin className="w-4 h-4 mt-0.5 text-muted-foreground" />
                  <span className="text-foreground">Virtual with potential in-person component</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <Users className="w-4 h-4 mt-0.5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="font-medium text-foreground mb-2">Purpose:</p>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Connect families for support and shared experiences</li>
                      <li>• Present latest research updates</li>
                      <li>• Provide expert consultations</li>
                      <li>• Plan collaborative research priorities</li>
                    </ul>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full mt-4"
                  asChild
                  data-testid="button-register-interest"
                >
                  <a href="#contact">Register Interest</a>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card data-testid="card-combinedbrain-meeting">
            <CardHeader>
              <CardTitle className="text-xl font-heading">COMBINEDBrain Annual Meeting</CardTitle>
              <CardDescription className="flex items-center gap-2 mt-2">
                <Calendar className="w-4 h-4" />
                <span>Check COMBINEDBrain website for details</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground mb-6">
                MED13 families are welcome to attend this larger gathering of rare neurodevelopmental disorder communities. This is an excellent opportunity to connect with researchers, clinicians, and other families navigating similar journeys.
              </p>
              <Button 
                variant="outline" 
                className="w-full"
                asChild
                data-testid="button-learn-more"
              >
                <a href="https://combinedbrain.org" target="_blank" rel="noopener noreferrer">Learn More</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
