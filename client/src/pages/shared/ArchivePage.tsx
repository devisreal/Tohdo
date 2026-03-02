import DefaultLayout from "@/layouts/default";

export default function ArchivePage() {
  return (
    <DefaultLayout className="pt-28">
      <header className="mx-auto max-w-2xl rounded-2xl border bg-card p-6 sm:p-6">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Archive
        </h1>
        <p className="mt-3 text-sm text-muted-foreground sm:text-base">
          This is another protected route to demonstrate shared auth guards.
        </p>
      </header>
    </DefaultLayout>
  );
}
