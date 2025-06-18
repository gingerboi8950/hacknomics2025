"use client";

import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

interface UserAuthFormProps extends React.ComponentProps<"div"> {
  mode?: "sign-in" | "sign-up";
}

export function UserAuthForm({
  className,
  mode = "sign-in",
  ...props
}: UserAuthFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    const endpoint = mode === "sign-up" ? "signup" : "login";

    try {
      const response = await axios.post(`http://localhost:5000/${endpoint}`, {
        email,
        password,
      });

      const token = response.data.token;

      if (token) {
        localStorage.setItem("token", token);
        console.log("✅ Token stored:", token);
        router.push("/dashboard"); // redirect to dashboard
      } else {
        console.warn("⚠️ No token received in response.");
      }
    } catch (error) {
      console.error("❌ Error:", error);
    } finally {
      setTimeout(() => setIsLoading(false), 3000);
    }
  }

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth0/google";
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

      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        onClick={handleGoogleLogin}
        className="flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <Icon name="Loader2" className="h-4 w-4 animate-spin" />
        ) : (
          <FcGoogle className="h-5 w-5" />
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
