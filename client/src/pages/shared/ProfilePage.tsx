import api, { getApiErrorMessage } from "@/api";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DefaultLayout from "@/layouts/default";
import { Trash2, UserRoundPen } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

type UserProfile = {
  id: number;
  firstname: string | null;
  lastname: string | null;
  username: string;
  email: string;
  joinedAt: string;
  profilePicture: string | null;
};

type UserProfileResponse = {
  status: string;
  user: UserProfile;
};

const formatDateTime = (value: string) =>
  new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setIsLoading(true);
        setErrorMessage(null);
        const { data } = await api.get<UserProfileResponse>("/users/me");
        setProfile(data.user);
      } catch (error: unknown) {
        setErrorMessage(
          getApiErrorMessage(
            error,
            "Unable to load profile details. Please try again.",
          ),
        );
      } finally {
        setIsLoading(false);
      }
    };

    void loadProfile();
  }, []);

  const fullName = useMemo(() => {
    if (!profile) return "Not provided";
    const first = profile.firstname ?? "";
    const last = profile.lastname ?? "";
    const combined = `${first} ${last}`.trim();
    return combined || "Not provided";
  }, [profile]);

  return (
    <DefaultLayout className="pt-28">
      <section className="mx-auto w-full max-w-2xl space-y-6">
        <header className="rounded-2xl border bg-card p-6 sm:p-6">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Profile
          </h1>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            Review your account details and go to security actions.
          </p>
        </header>

        <Card className="shadow-none">
          <CardHeader>
            <CardTitle className="text-lg tracking-tighter">
              Profile details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isLoading ? (
              <p className="text-sm text-muted-foreground">
                Loading your profile...
              </p>
            ) : errorMessage ? (
              <p className="text-sm text-destructive">{errorMessage}</p>
            ) : profile ? (
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    First and last name
                  </p>
                  <p className="text-sm font-medium">{fullName}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    Username
                  </p>
                  <p className="text-sm font-medium">{profile.username}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    Email
                  </p>
                  <p className="text-sm font-medium break-all">
                    {profile.email}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    Joined
                  </p>
                  <p className="text-sm font-medium">
                    {formatDateTime(profile.joinedAt)}
                  </p>
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    Profile picture
                  </p>
                  <div className="rounded-md border border-dashed border-border p-4 text-sm text-muted-foreground">
                    Field reserved for profile picture upload (to be
                    implemented).
                  </div>
                </div>

                <div className=" col-span-2 flex justify-end">
                  <Button
                    className="rounded-full cursor-pointer"
                    variant="outline"
                    asChild
                  >
                    <Link to="/profile/edit">
                      <UserRoundPen />
                      Edit profile
                    </Link>
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No profile data available.
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardHeader>
            <CardTitle className="text-lg tracking-tighter">
              Account actions
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/profile/change-password">Change password</Link>
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  className="rounded-full cursor-pointer"
                >
                  Delete profile
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent size="sm" className="rounded-4xl shadow-none">
                <AlertDialogHeader>
                  <AlertDialogMedia className="w-fit h-fit p-4 rounded-full bg-destructive/10 text-destructive dark:bg-destructive/50">
                    <Trash2 className="size-6 dark:text-red-500" />
                  </AlertDialogMedia>
                  <AlertDialogTitle className="mt-2">
                    Are you absolutely sure?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="mt-2">
                    This will permanently delete your profile and Tohdos.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="mt-2">
                  <AlertDialogCancel asChild>
                    <Button
                      variant="outline"
                      className="rounded-full cursor-pointer"
                    >
                      Cancel
                    </Button>
                  </AlertDialogCancel>
                  <AlertDialogAction asChild variant="destructive">
                    <Button className="rounded-full cursor-pointer">
                      Delete
                    </Button>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>
      </section>
    </DefaultLayout>
  );
}
