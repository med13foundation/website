import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { NewsletterSubscriber } from "@shared/schema";

export default function Admin() {
  const [password, setPassword] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const { toast } = useToast();

  const { data, isLoading, error, refetch } = useQuery<{ subscribers: NewsletterSubscriber[] }>({
    queryKey: ["/api/newsletter/subscribers"],
    enabled: isAuthorized,
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admins") {
      setIsAuthorized(true);
      toast({
        title: "Success",
        description: "Welcome to the admin panel.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Invalid password.",
      });
    }
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Admin Access
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  data-testid="input-password"
                />
              </div>
              <Button type="submit" className="w-full" data-testid="button-login">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <Button variant="outline" onClick={() => setIsAuthorized(false)} data-testid="button-logout">
            Logout
          </Button>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Newsletter Subscribers</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : error ? (
              <div className="text-red-500 p-4">Error loading subscribers.</div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableHead>Subscribed At</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data?.subscribers.map((sub) => (
                      <TableRow key={sub.id}>
                        <TableCell className="font-medium">{sub.email}</TableCell>
                        <TableCell>
                          {new Date(sub.subscribedAt).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                    {data?.subscribers.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={2} className="text-center py-8 text-muted-foreground">
                          No subscribers yet.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
