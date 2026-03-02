import { getApiErrorMessage } from "@/api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as yup from "yup";

export const SignUpFormSchema = yup
  .object()
  .shape({
    username: yup.string().required("Username is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be 8 characters or more"),
    confirm_password: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("This field is required"),
  })
  .required();

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const { register: registerUserAction } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(SignUpFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    mode: "onBlur",
  });

  const registerUser = async (formValues: {
    username: string;
    email: string;
    password: string;
    confirm_password: string;
  }) => {
    try {
      await registerUserAction({
        username: formValues.username,
        email: formValues.email,
        password: formValues.password,
      });
      toast.success("Account created successfully");
      reset();
      navigate("/tohdos", { replace: true });
    } catch (error: unknown) {
      toast.error(
        getApiErrorMessage(
          error,
          "Unable to create account. Please try again.",
        ),
      );
    }
  };

  return (
    <Card {...props} className="w-full sm:max-w-md p-3 py-4 gap-3">
      <CardHeader className="p-0 xs:p-1 sm:p-3">
        <CardTitle className="text-base lg:text-lg">
          Create an account
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 xs:p-1 sm:p-3">
        <form onSubmit={handleSubmit(registerUser)}>
          <FieldGroup className="gap-4">
            <Field>
              <FieldLabel htmlFor="username" className="text-sm">
                Username
              </FieldLabel>
              <Input
                id="username"
                type="text"
                placeholder="JohnDoe"
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
                placeholder="m@example.com"
                {...register("email")}
                className="text-sm"
              />
              <FieldError>{errors.email?.message}</FieldError>
            </Field>
            <Field>
              <FieldLabel htmlFor="password" className="text-sm">
                Password
              </FieldLabel>
              <Input
                id="password"
                type="password"
                {...register("password")}
                className="text-sm"
              />
              <FieldDescription className="text-xs">
                Must be at least 8 characters long.
              </FieldDescription>
              <FieldError>{errors.password?.message}</FieldError>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password" className="text-sm">
                Confirm Password
              </FieldLabel>
              <Input
                id="confirm-password"
                type="password"
                {...register("confirm_password")}
                className="text-sm"
              />
              <FieldDescription className="text-xs">
                Please confirm your password.
              </FieldDescription>
              <FieldError>{errors.confirm_password?.message}</FieldError>
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit" className="text-sm rounded-full">
                  {isSubmitting ? "Creating account..." : "Create Account"}
                </Button>
                <FieldDescription className="px-6 text-xs sm:text-sm text-center">
                  Already have an account?{" "}
                  <Link to="/auth/sign-in">Sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
