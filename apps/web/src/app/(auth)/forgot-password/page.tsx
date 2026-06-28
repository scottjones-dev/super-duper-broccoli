"use client"

import Link from "next/link"
import { useActionState } from "react"
import { ArrowLeft } from "lucide-react"
import { authClient } from "@/lib/auth-client"
import {
  Button,
  buttonVariants,
} from "@deeliciousbakes/ui/components/button"
import { cn } from "@deeliciousbakes/ui/lib/utils"
import { Input } from "@deeliciousbakes/ui/components/input"
import {
  Field,
  FieldLabel,
  FieldError,
} from "@deeliciousbakes/ui/components/field"
import { Alert, AlertDescription } from "@deeliciousbakes/ui/components/alert"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@deeliciousbakes/ui/components/card"

interface ForgotPasswordFormState {
  errors?: {
    _form?: string
    email?: string
  } | null
  success?: boolean
}

export default function ForgotPasswordPage() {
  const [state, action, pending] = useActionState<
    ForgotPasswordFormState,
    FormData
  >(
    async (prevState: ForgotPasswordFormState, formData: FormData) => {
      const email = formData.get("email") as string

      const validationErrors: ForgotPasswordFormState["errors"] = {}

      if (!email) {
        validationErrors.email = "Email is required."
      }

      if (Object.keys(validationErrors).length > 0) {
        return { errors: validationErrors, success: false }
      }

      let actionError: string | null = null

      await authClient.requestPasswordReset(
        {
          email,
          redirectTo: `${window.location.origin}/reset-password`,
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
          Enter your email and we will send you a reset link.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {state.success ? (
          <div className="space-y-4">
            <Alert className="border-primary/20 bg-primary/5 text-primary">
              <AlertDescription>
                We have sent a password reset link to your email. Please check
                your inbox and spam folder.
              </AlertDescription>
            </Alert>
            <Link href="/sign-in" className={cn(buttonVariants({ variant: "ghost" }), "w-full gap-2")}>
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
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@email.com"
                disabled={pending}
              />
              <FieldError>{state.errors?.email}</FieldError>
            </Field>

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={pending}
            >
              {pending ? "Sending reset link..." : "Send reset link"}
            </Button>

            <Link href="/sign-in" className={cn(buttonVariants({ variant: "ghost" }), "w-full gap-2")}>
              <ArrowLeft className="h-4 w-4" />
              Back to sign in
            </Link>
          </form>
        )}
      </CardContent>
    </Card >
  )
}
