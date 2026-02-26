import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as yup from "yup";

export const LoginFormSchema = yup
  .object()
  .shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be 6 characters or more"),
  })
  .required();

export function LoginForm({ ...props }: React.ComponentProps<typeof Card>) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const loginUser = async (formValues: { email: string; password: string }) => {
    // try {
    //   await login(formValues);
    //   toast.success("Logged in successfully!");
    //   reset();
    //   navigate("/");
    // } catch (error: unknown) {
    //   if (axios.isAxiosError(error) && error.response) {
    //     toast.error(error.response.data.message);
    //     console.error(error.response.data.message);
    //   } else {
    //     toast.error("An unexpected error occurred.");
    //     console.error(error);
    //   }
    // }
    console.log(formValues);
    // setTimeout(() => {
    //   reset();
    // }, 1000);
  };

  return (
    <Card {...props} className="w-full sm:max-w-md p-3 py-4 gap-3">
      <CardHeader className="p-0 xs:p-1 sm:p-3">
        <CardTitle className="text-base lg:text-lg">Login to your account</CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 xs:p-1 sm:p-3">
        <form onSubmit={handleSubmit(loginUser)}>
          <FieldGroup className="gap-4">
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
              <div className="flex items-center">
                <FieldLabel htmlFor="password" className="text-sm">
                  Password
                </FieldLabel>
                <a
                  href="#"
                  className="ml-auto inline-block text-xs underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input id="password" type="password" {...register("password")} className="text-sm" />
              <FieldError>{errors.password?.message}</FieldError>
            </Field>
            <Field>
              <Button type="submit" className="text-sm rounded-full">
                {isSubmitting ? "Logging in..." : "Login"}
              </Button>
              <FieldDescription className="text-center text-xs sm:text-sm">
                Don&apos;t have an account? <Link to="/auth/sign-up">Sign up</Link>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
