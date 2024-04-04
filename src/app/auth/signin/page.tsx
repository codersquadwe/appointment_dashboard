import React from "react";
import { Metadata } from "next";

import SignInComp from "@/components/auth/SignInComp";
export const metadata: any = {
  title: "Sign In",
};

const SignIn: React.FC = () => {

  return (
    <>
      <div>
        <SignInComp />
      </div>
    </>
  );
};

export default SignIn;
