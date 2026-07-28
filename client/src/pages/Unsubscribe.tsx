import { useState } from "react";
import { useSearch } from "wouter";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import { ArrowLeft, MailX, CheckCircle } from "lucide-react";

export default function Unsubscribe() {
  const search = useSearch();
  const params = new URLSearchParams(search);
  const prefilled = params.get("email") || "";
  const [email, setEmail] = useState(prefilled);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const { t } = useTranslation();

  const handleUnsubscribe = async () => {
    if (!email.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="py-12 text-center">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h1 className="text-xl font-heading font-bold mb-2" data-testid="text-unsubscribe-success">
              {t("unsubscribe.successTitle")}
            </h1>
            <p className="text-muted-foreground mb-6">
              {t("unsubscribe.successDesc")}
            </p>
            <Link href="/">
              <Button variant="outline" data-testid="button-unsubscribe-home">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t("unsubscribe.backHome")}
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardContent className="py-10 text-center">
          <MailX className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-xl font-heading font-bold mb-2" data-testid="text-unsubscribe-title">
            {t("unsubscribe.title")}
          </h1>
          <p className="text-muted-foreground mb-6">
            {t("unsubscribe.desc")}
          </p>
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              data-testid="input-unsubscribe-email"
            />
            <Button
              onClick={handleUnsubscribe}
              disabled={!email.trim() || status === "loading"}
              data-testid="button-unsubscribe-confirm"
            >
              {status === "loading" ? "..." : t("unsubscribe.button")}
            </Button>
          </div>
          {status === "error" && (
            <p className="text-sm text-destructive mt-3" data-testid="text-unsubscribe-error">
              {t("unsubscribe.error")}
            </p>
          )}
          <Link href="/">
            <Button variant="ghost" className="mt-4" data-testid="button-unsubscribe-back">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t("unsubscribe.backHome")}
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
