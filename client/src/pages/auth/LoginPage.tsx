import { LoginForm } from "@/components/login-form";
import DefaultLayout from "@/layouts/default";
import React from "react";

const LoginPage: React.FC = () => {
  return (
    <DefaultLayout className="pt-24 flex w-full items-center justify-center ">
      <LoginForm className="w-full max-w-sm" />
    </DefaultLayout>
  );
};

export default LoginPage;
