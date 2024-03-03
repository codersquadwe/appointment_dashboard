import React from "react";
import { Metadata } from "next";
import SignUpComp from "@/components/auth/SignUpComp";

export const metadata: Metadata = {
  title:
    "Sign Up"
};

const SignUp = () => {


  return (
    <div>
      <SignUpComp />
    </div>
  );
};

export default SignUp;
