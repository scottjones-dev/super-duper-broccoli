"use client"

import Link from "next/link"
import { useActionState, useEffect, useState } from "react"
import { ArrowLeft } from "lucide-react"
import { authClient } from "@/lib/auth-client"
import { Button, buttonVariants } from "@deeliciousbakes/ui/components/button"
import { Input } from "@deeliciousbakes/ui/components/input"
import {
  Field,
  FieldLabel,
  FieldError,
} from "@deeliciousbakes/ui/components/field"
import { Alert, AlertDescription } from "@deeliciousbakes/ui/components/alert"
import { Spinner } from "@deeliciousbakes/ui/components/spinner"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@deeliciousbakes/ui/components/card"
import { cn } from "@deeliciousbakes/ui/lib/utils"

interface ResetPasswordFormState {
  errors?: {
    _form?: string
    password?: string
    confirm?: string
  } | null
  success?: boolean
}

export default function ResetPasswordPage() {
  const [token, setToken] = useState<string | null>(null)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    setToken(urlParams.get("token"))
    setChecking(false)
  }, [])

  const [state, action, pending] = useActionState<
    ResetPasswordFormState,
    FormData
  >(
    async (prevState: ResetPasswordFormState, formData: FormData) => {
      const password = formData.get("password") as string
      const confirm = formData.get("confirm") as string

      const validationErrors: ResetPasswordFormState["errors"] = {}

      if (!password) {
        validationErrors.password = "Password is required."
      }
      if (password !== confirm) {
        validationErrors.confirm = "Passwords do not match."
      }
      if (!token) {
        validationErrors._form =
          "Reset token is missing. Please request a new link."
      }

      if (Object.keys(validationErrors).length > 0) {
        return { errors: validationErrors, success: false }
      }

      let actionError: string | null = null

      await authClient.resetPassword(
        {
          newPassword: password,
          token: token!,
        },
        {
          onError: (ctx) => {
            actionError = ctx.error.message
          },
        }
      )

      if (actionError) {
        return { errors: { _form: actionError }, success: false }
      }

      return { errors: null, success: true }
    },
    { errors: null, success: false }
  )

  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="font-heading text-2xl">
          Reset your password
        </CardTitle>
        <CardDescription>
          Enter your new password below to update your credentials.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {checking ? (
          <div className="flex h-32 items-center justify-center">
            <Spinner className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : !token ? (
          <div className="space-y-4">
            <Alert variant="destructive">
              <AlertDescription>
                The password reset token is missing or invalid. Please request a
                new link.
              </AlertDescription>
            </Alert>
            <Link
              href="/sign-in"
              className={cn(buttonVariants({ variant: "ghost" }), "w-full gap-2")}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to sign in
            </Link>
          </div>
        ) : state.success ? (
          <div className="space-y-4">
            <Alert className="border-primary/20 bg-primary/5 text-primary">
              <AlertDescription>
                Your password has been successfully reset. You can now sign in
                with your new password.
              </AlertDescription>
            </Alert>
            <Link
              href="/sign-in"
              className={cn(buttonVariants({ variant: "ghost" }), "w-full gap-2")}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to sign in
            </Link>
          </div>
        ) : (
          <form action={action} className="space-y-4">
            {state.errors?._form && (
              <Alert variant="destructive">
                <AlertDescription>{state.errors._form}</AlertDescription>
              </Alert>
            )}

            <Field className="space-y-2">
              <FieldLabel htmlFor="password">New Password</FieldLabel>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                disabled={pending}
              />
              <FieldError>{state.errors?.password}</FieldError>
            </Field>

            <Field className="space-y-2">
              <FieldLabel htmlFor="confirm">Confirm New Password</FieldLabel>
              <Input
                id="confirm"
                name="confirm"
                type="password"
                placeholder="••••••••"
                disabled={pending}
              />
              <FieldError>{state.errors?.confirm}</FieldError>
            </Field>

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={pending}
            >
              {pending ? "Resetting password..." : "Update password"}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  )
}
