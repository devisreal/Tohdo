import { SignupForm } from "@/components/signup-form";
import DefaultLayout from "@/layouts/default";
import React from "react";

const RegisterPage: React.FC = () => {
  return (
    <DefaultLayout className="pt-24 flex w-full items-center justify-center ">
      <SignupForm className="w-full max-w-sm" />
    </DefaultLayout>
  );
};

export default RegisterPage;
