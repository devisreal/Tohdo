import api, { getApiErrorMessage } from "@/api";
import { Pattern } from "@/components/patterns/p-file-upload-2";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import DefaultLayout from "@/layouts/default";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as yup from "yup";

// Form validation schema for editable profile fields.
const EditProfileFormSchema = yup
  .object()
  .shape({
    firstname: yup.string().required("Firstname is required"),
    lastname: yup.string().required("Lastname is required"),
    username: yup.string().required("Username is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
  })
  .required();

type EditProfileFormValues = yup.InferType<typeof EditProfileFormSchema>;

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

type UpdateProfileResponse = {
  status: string;
  message: string;
  user: UserProfile;
};

// Normalize API profile payload into the exact form shape expected by RHF.
const toEditProfileFormValues = (
  profile: UserProfile,
): EditProfileFormValues => ({
  firstname: profile.firstname ?? "",
  lastname: profile.lastname ?? "",
  username: profile.username,
  email: profile.email,
});

export default function EditProfilePage() {
  // Keep track of initial profile bootstrap state for loading/error UI.
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [profileLoadError, setProfileLoadError] = useState<string | null>(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<EditProfileFormValues>({
    resolver: yupResolver(EditProfileFormSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      username: "",
      email: "",
    },
    mode: "onBlur",
  });

  useEffect(() => {
    // Load current profile once and pre-populate the edit form.
    const loadCurrentProfile = async () => {
      try {
        setIsProfileLoading(true);
        setProfileLoadError(null);

        const { data } = await api.get<UserProfileResponse>("/users/me");

        // RHF reset is the simplest and safest way to prefill all fields.
        reset(toEditProfileFormValues(data.user));
      } catch (error: unknown) {
        setProfileLoadError(
          getApiErrorMessage(
            error,
            "Unable to load profile details. Please refresh and try again.",
          ),
        );
      } finally {
        setIsProfileLoading(false);
      }
    };

    void loadCurrentProfile();
  }, [reset]);

  const editProfile = async (formValues: EditProfileFormValues) => {
    try {
      // Submit editable profile fields only (image upload is ignored for now).
      const { data } = await api.put<UpdateProfileResponse>(
        "/users/me",
        formValues,
      );

      // Reset with server-returned values to keep the form in sync.
      reset(toEditProfileFormValues(data.user));
      navigate("/profile");
      toast.success("Profile updated successfully");
    } catch (error: unknown) {
      toast.error(
        getApiErrorMessage(
          error,
          "Unable to update profile. Please try again.",
        ),
      );
    }
  };

  return (
    <DefaultLayout className="pt-28">
      <section className="mx-auto w-full max-w-2xl space-y-6">
        <header className="rounded-2xl border bg-card p-6 sm:p-6">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Edit Profile
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
            {isProfileLoading ? (
              <p className="text-sm text-muted-foreground">
                Loading your profile...
              </p>
            ) : profileLoadError ? (
              <p className="text-sm text-destructive">{profileLoadError}</p>
            ) : (
              <form className="space-y-12" onSubmit={handleSubmit(editProfile)}>
                {/* Keep image upload UI visible, but do not send image data yet. */}
                <Pattern />

                <FieldGroup className="grid gap-4 sm:grid-cols-2 grid-flow-row-dense">
                  <Field>
                    <FieldLabel htmlFor="firstname" className="text-sm">
                      Firstname
                    </FieldLabel>
                    <Input
                      id="firstname"
                      type="text"
                      {...register("firstname")}
                      className="text-sm"
                    />
                    <FieldError>{errors.firstname?.message}</FieldError>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="lastname" className="text-sm">
                      Lastname
                    </FieldLabel>
                    <Input
                      id="lastname"
                      type="text"
                      {...register("lastname")}
                      className="text-sm"
                    />
                    <FieldError>{errors.lastname?.message}</FieldError>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="username" className="text-sm">
                      Username
                    </FieldLabel>
                    <Input
                      id="username"
                      type="text"
                      {...register("username")}
                      className="text-sm"
                    />
                    <FieldError>{errors.username?.message}</FieldError>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="email" className="text-sm">
                      Email
                    </FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      {...register("email")}
                      className="text-sm"
                    />
                    <FieldError>{errors.email?.message}</FieldError>
                  </Field>
                </FieldGroup>

                <Field className="w-fit mx-auto">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="text-sm min-w-xs rounded-full"
                  >
                    {isSubmitting ? "Saving..." : "Save changes"}
                  </Button>
                </Field>
              </form>
            )}
          </CardContent>
        </Card>
      </section>
    </DefaultLayout>
  );
}
