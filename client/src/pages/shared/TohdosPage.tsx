import { useAuth } from "@/hooks/useAuth";
import DefaultLayout from "@/layouts/default";

export default function TohdosPage() {
  const { user } = useAuth();
  

  return (
    <DefaultLayout className="pt-28">
      <header className="mx-auto max-w-2xl rounded-2xl border bg-card p-6 sm:p-6">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Tohdos
        </h1>
        <p className="mt-3 text-sm text-muted-foreground sm:text-base">
          You are signed in as{" "}
          <span className="font-medium text-foreground">{user?.email}</span>.
        </p>
        <p className="mt-2 text-sm text-muted-foreground sm:text-base">
          This route is protected and only renders for authenticated users.
        </p>
      </header>
    </DefaultLayout>
  );
}
