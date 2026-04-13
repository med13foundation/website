import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { isAdminAuthenticated, setAdminToken, clearAdminToken, adminFetch } from "@/lib/adminAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Users,
  Mail,
  Plus,
  Trash2,
  Edit,
  ArrowLeft,
  LogOut,
  Send,
  FileText,
  Lock,
  Eye,
  Link2,
  RefreshCw,
} from "lucide-react";
import RichTextEditor from "@/components/RichTextEditor";
import DOMPurify from "dompurify";
import type { Newsletter, NewsletterSubscriber } from "@shared/schema";
import { Link } from "wouter";

function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        setAdminToken(data.token);
        onLogin();
      } else {
        setError(data.error || "Invalid password");
      }
    } catch {
      setError("Connection failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="font-heading text-xl" data-testid="text-admin-title">Admin Access</CardTitle>
          <p className="text-sm text-muted-foreground">Enter your admin password to continue</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              data-testid="input-admin-password"
            />
            {error && <p className="text-sm text-destructive" data-testid="text-login-error">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading || !password} data-testid="button-admin-login">
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

function SubscribersTab() {
  const { toast } = useToast();

  const { data, isLoading } = useQuery<{ subscribers: NewsletterSubscriber[] }>({
    queryKey: ["/api/admin/subscribers"],
    queryFn: async () => {
      const res = await adminFetch("/api/admin/subscribers");
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await adminFetch(`/api/admin/subscribers/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/subscribers"] });
      toast({ title: "Subscriber removed" });
    },
  });

  const syncMutation = useMutation({
    mutationFn: async () => {
      const res = await adminFetch("/api/admin/subscribers/sync", { method: "POST" });
      if (!res.ok) throw new Error("Failed to sync");
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/subscribers"] });
      toast({
        title: "Google Sheets sync complete",
        description: `${data.imported} imported, ${data.skipped} already existed${data.errors?.length ? `, ${data.errors.length} errors` : ""}`,
      });
    },
    onError: () => {
      toast({ title: "Sync failed", description: "Could not sync from Google Sheets", variant: "destructive" });
    },
  });

  const subscribers = data?.subscribers || [];

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-16 bg-muted rounded-md animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <h2 className="text-lg font-heading font-semibold" data-testid="text-subscribers-heading">
          Email Subscribers
        </h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => syncMutation.mutate()}
            disabled={syncMutation.isPending}
            data-testid="button-sync-sheets"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${syncMutation.isPending ? "animate-spin" : ""}`} />
            {syncMutation.isPending ? "Syncing..." : "Sync from Google Sheets"}
          </Button>
          <Badge variant="secondary" data-testid="badge-subscriber-count">
            {subscribers.length} total
          </Badge>
        </div>
      </div>

      {subscribers.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Users className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No subscribers yet</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {subscribers.map((sub) => (
            <Card key={sub.id} data-testid={`card-subscriber-${sub.id}`}>
              <CardContent className="flex items-center justify-between gap-2 py-3 flex-wrap">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex items-center justify-center w-9 h-9 rounded-full bg-primary/10 shrink-0">
                    <Mail className="w-4 h-4 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate" data-testid={`text-subscriber-email-${sub.id}`}>
                      {sub.email}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Joined {new Date(sub.subscribedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size="icon" variant="ghost" data-testid={`button-delete-subscriber-${sub.id}`}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Remove subscriber?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently remove {sub.email} from your subscriber list.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel data-testid="button-cancel-delete">Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => deleteMutation.mutate(sub.id)}
                        data-testid="button-confirm-delete"
                      >
                        Remove
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function NewsletterEditor({
  newsletter,
  onSave,
  onCancel,
}: {
  newsletter?: Newsletter;
  onSave: () => void;
  onCancel: () => void;
}) {
  const { toast } = useToast();
  const [title, setTitle] = useState(newsletter?.title || "");
  const [content, setContent] = useState(newsletter?.content || "");

  const saveMutation = useMutation({
    mutationFn: async () => {
      const url = newsletter
        ? `/api/admin/newsletters/${newsletter.id}`
        : "/api/admin/newsletters";
      const method = newsletter ? "PATCH" : "POST";
      const res = await adminFetch(url, {
        method,
        body: JSON.stringify({ title, content }),
      });
      if (!res.ok) throw new Error("Failed to save");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/newsletters"] });
      toast({ title: newsletter ? "Newsletter updated" : "Newsletter created" });
      onSave();
    },
    onError: () => {
      toast({ title: "Failed to save newsletter", variant: "destructive" });
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 flex-wrap">
        <Button variant="ghost" onClick={onCancel} data-testid="button-back-to-list">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <h2 className="text-lg font-heading font-semibold">
          {newsletter ? "Edit Newsletter" : "New Newsletter"}
        </h2>
      </div>

      <Input
        placeholder="Newsletter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="text-lg font-heading"
        data-testid="input-newsletter-title"
      />

      <RichTextEditor
        content={content}
        onChange={setContent}
        placeholder="Write your newsletter content here..."
      />

      <div className="flex gap-2 flex-wrap">
        <Button
          onClick={() => saveMutation.mutate()}
          disabled={!title.trim() || !content.trim() || saveMutation.isPending}
          data-testid="button-save-newsletter"
        >
          <FileText className="w-4 h-4 mr-2" />
          {saveMutation.isPending ? "Saving..." : newsletter ? "Update" : "Save as Draft"}
        </Button>
        <Button variant="outline" onClick={onCancel} data-testid="button-cancel-editor">
          Cancel
        </Button>
      </div>
    </div>
  );
}

function NewsletterPreview({ newsletter, onClose }: { newsletter: Newsletter; onClose: () => void }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 flex-wrap">
        <Button variant="ghost" onClick={onClose} data-testid="button-close-preview">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <h2 className="text-lg font-heading font-semibold">Preview</h2>
      </div>
      <Card>
        <CardContent className="py-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-6 pb-4 border-b">
              <h1 className="text-2xl font-heading font-bold text-primary mb-1" data-testid="text-preview-title">
                {newsletter.title}
              </h1>
              <p className="text-xs text-muted-foreground">
                {new Date(newsletter.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(newsletter.content) }}
              data-testid="text-preview-content"
            />
            <div className="mt-8 pt-4 border-t text-center text-xs text-muted-foreground">
              MED13 Foundation Newsletter
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function NewslettersTab() {
  const { toast } = useToast();
  const [view, setView] = useState<"list" | "editor" | "preview">("list");
  const [selected, setSelected] = useState<Newsletter | undefined>();

  const { data, isLoading } = useQuery<{ newsletters: Newsletter[] }>({
    queryKey: ["/api/admin/newsletters"],
    queryFn: async () => {
      const res = await adminFetch("/api/admin/newsletters");
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await adminFetch(`/api/admin/newsletters/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/newsletters"] });
      toast({ title: "Newsletter deleted" });
    },
  });

  const markSentMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await adminFetch(`/api/admin/newsletters/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status: "sent", sentAt: new Date().toISOString() }),
      });
      if (!res.ok) throw new Error("Failed to update");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/newsletters"] });
      toast({ title: "Newsletter marked as sent" });
    },
  });

  const newsletters = data?.newsletters || [];

  if (view === "editor") {
    return (
      <NewsletterEditor
        newsletter={selected}
        onSave={() => { setView("list"); setSelected(undefined); }}
        onCancel={() => { setView("list"); setSelected(undefined); }}
      />
    );
  }

  if (view === "preview" && selected) {
    return <NewsletterPreview newsletter={selected} onClose={() => { setView("list"); setSelected(undefined); }} />;
  }

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-20 bg-muted rounded-md animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <h2 className="text-lg font-heading font-semibold" data-testid="text-newsletters-heading">
          Newsletters
        </h2>
        <Button onClick={() => { setSelected(undefined); setView("editor"); }} data-testid="button-create-newsletter">
          <Plus className="w-4 h-4 mr-2" />
          New Newsletter
        </Button>
      </div>

      {newsletters.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <FileText className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No newsletters yet</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => { setSelected(undefined); setView("editor"); }}
              data-testid="button-create-first-newsletter"
            >
              Create your first newsletter
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {newsletters.map((nl) => (
            <Card key={nl.id} data-testid={`card-newsletter-${nl.id}`}>
              <CardContent className="flex items-center justify-between gap-3 py-3 flex-wrap">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="flex items-center justify-center w-9 h-9 rounded-full bg-primary/10 shrink-0">
                    <FileText className="w-4 h-4 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-medium truncate" data-testid={`text-newsletter-title-${nl.id}`}>
                        {nl.title}
                      </p>
                      <Badge variant={nl.status === "sent" ? "default" : "outline"} className="text-xs">
                        {nl.status === "sent" ? "Sent" : "Draft"}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Created {new Date(nl.createdAt).toLocaleDateString()}
                      {nl.sentAt && ` · Sent ${new Date(nl.sentAt).toLocaleDateString()}`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => { setSelected(nl); setView("preview"); }}
                    data-testid={`button-preview-newsletter-${nl.id}`}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => { setSelected(nl); setView("editor"); }}
                    data-testid={`button-edit-newsletter-${nl.id}`}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  {nl.status === "sent" && (
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={async () => {
                        const url = `${window.location.origin}/newsletter/${nl.id}`;
                        await navigator.clipboard.writeText(url);
                        toast({ title: "Share link copied" });
                      }}
                      data-testid={`button-copy-link-${nl.id}`}
                    >
                      <Link2 className="w-4 h-4 text-primary" />
                    </Button>
                  )}
                  {nl.status === "draft" && (
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => markSentMutation.mutate(nl.id)}
                      data-testid={`button-mark-sent-${nl.id}`}
                    >
                      <Send className="w-4 h-4 text-primary" />
                    </Button>
                  )}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="icon" variant="ghost" data-testid={`button-delete-newsletter-${nl.id}`}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete newsletter?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently delete "{nl.title}". This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel data-testid="button-cancel-delete-newsletter">Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deleteMutation.mutate(nl.id)}
                          data-testid="button-confirm-delete-newsletter"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(isAdminAuthenticated());

  if (!authenticated) {
    return <LoginForm onLogin={() => setAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="icon" data-testid="button-back-home">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <h1 className="text-lg font-heading font-bold" data-testid="text-admin-dashboard-title">
              Admin Dashboard
            </h1>
          </div>
          <Button
            variant="ghost"
            onClick={() => { clearAdminToken(); setAuthenticated(false); }}
            data-testid="button-logout"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Log Out
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <Tabs defaultValue="subscribers">
          <TabsList className="mb-6" data-testid="tabs-admin">
            <TabsTrigger value="subscribers" data-testid="tab-subscribers">
              <Users className="w-4 h-4 mr-2" />
              Subscribers
            </TabsTrigger>
            <TabsTrigger value="newsletters" data-testid="tab-newsletters">
              <Mail className="w-4 h-4 mr-2" />
              Newsletters
            </TabsTrigger>
          </TabsList>
          <TabsContent value="subscribers">
            <SubscribersTab />
          </TabsContent>
          <TabsContent value="newsletters">
            <NewslettersTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
