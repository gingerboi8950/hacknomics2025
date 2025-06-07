"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import axios from "axios";

export function UserAuthForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);
    // console.log(email);
    // console.log(password);
    // axios
    //   .post("http://localhost:5000/login", {
    //     email,
    //     password,
    //   })
    //   .then((response) => {
    //     console.log("Success:", response.data);
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });
    console.log(password);
    console.log(email);
    axios
      .post("http://localhost:5000/signup", {
        email,
        password,
      })
      .then((response) => {
        console.log("Success:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  const handleLogin = async () => {
    axios
      .post("http://localhost:5000/login", {
        email,
        password,
      })
      .then((response) => {
        console.log("Success:", response.data);
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
            Sign In
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
          <Icon name="Github" className="mr-2 h-4 w-4" />
        )}{" "}
        GitHub
      </Button>
    </div>
  );
}
