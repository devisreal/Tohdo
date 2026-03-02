import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DefaultLayout from "@/layouts/default";
import { Link } from "react-router-dom";

export default function ChangePasswordPage() {
  return (
    <DefaultLayout className="pt-28">
      <section className="mx-auto w-full max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Change password</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              This page is reserved for your password update flow.
            </p>
            <Button asChild variant="outline">
              <Link to="/profile">Back to profile</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </DefaultLayout>
  );
}
