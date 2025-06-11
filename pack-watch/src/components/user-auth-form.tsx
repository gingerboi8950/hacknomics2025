"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import axios from "axios";
import { signIn } from "next-auth/react"; //  Import Google sign-in handler
import { FcGoogle } from "react-icons/fc";

interface UserAuthFormProps extends React.ComponentProps<"div"> {
  mode?: "sign-in" | "sign-up";
}

export function UserAuthForm({
  className,
  mode = "sign-in",
  ...props
}: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);
    mode === "sign-up" ? await handleSignUp() : await handleLogin();
  }

  const handleLogin = async () => {
    axios
      .post("http://localhost:5000/login", {
        email,
        password,
      })
      .then((response) => {
        console.log("Success:", response.data);
        window.location.href = "/dashboard";
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const handleSignUp = async () => {
    console.log(password);
    console.log(email);
    axios
      .post("http://localhost:5000/signup", {
        email,
        password,
      })
      .then((response) => {
        console.log("Success:", response.data);
        window.location.href = "/dashboard";
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              className="w-full"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
            <Input
              id="password"
              placeholder="Password"
              type="password"
              className="w-full"
              autoCapitalize="none"
              autoComplete="new-password"
              autoCorrect="off"
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <Button disabled={isLoading} type="submit">
            {isLoading && (
              <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
            )}
            {mode === "sign-up" ? "Sign Up" : "Sign In"}
          </Button>
        </div>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background text-muted-foreground px-2">
            Or continue with
          </span>
        </div>
      </div>

      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <FcGoogle className="mr-2 h-4 w-4" /> // You can replace this with a Google icon
        )}
        {mode === "sign-up" ? "Sign Up with Google" : "Sign In with Google"}
      </Button>

      {mode === "sign-in" ? (
        <div className="text-left text-sm text-muted-foreground mt-2">
          Don’t have an account?{" "}
          <a href="/signup" className="underline hover:text-primary">
            Create one
          </a>
        </div>
      ) : (
        <div className="text-left text-sm text-muted-foreground mt-2">
          Already have an account?{" "}
          <a href="/" className="underline hover:text-primary">
            Sign in
          </a>
        </div>
      )}
    </div>
  );
}
