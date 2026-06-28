"use client"

import Link from "next/link"
import { useActionState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { authClient } from "@/lib/auth-client"
import { Button } from "@deeliciousbakes/ui/components/button"
import { Input } from "@deeliciousbakes/ui/components/input"
import { Checkbox } from "@deeliciousbakes/ui/components/checkbox"
import {
  Field,
  FieldLabel,
  FieldError,
} from "@deeliciousbakes/ui/components/field"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@deeliciousbakes/ui/components/card"

interface SignInFormState {
  errors?: {
    _form?: string
    email?: string
    password?: string
  } | null
  fields?: {
    email?: string
  }
  success?: boolean
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function SignInPage() {
  const router = useRouter()

  useEffect(() => {
    authClient.getSession().then((session) => {
      if (session.data?.user.role === "admin") router.push("/admin")
      else if (session.data?.user) router.push("/account")
    })
  }, [router])

  const [state, action, pending] = useActionState<SignInFormState, FormData>(
    async (_prev, formData) => {
      const email = (formData.get("email") as string).trim()
      const password = formData.get("password") as string
      const remember = formData.get("remember") === "on"

      // ── Client-side validation ──────────────────────────────────────────
      const validationErrors: NonNullable<SignInFormState["errors"]> = {}

      if (!email) {
        validationErrors.email = "Email is required."
      } else if (!EMAIL_RE.test(email)) {
        validationErrors.email = "Please enter a valid email address."
      }

      if (!password) validationErrors.password = "Password is required."

      if (Object.keys(validationErrors).length > 0) {
        return { errors: validationErrors, fields: { email }, success: false }
      }

      // ── API call ────────────────────────────────────────────────────────
      let toastId: string | number | undefined

      const { error } = await authClient.signIn.email(
        {
          email,
          password,
          rememberMe: remember,
          callbackURL: "/account",
        },
        {
          onRequest: () => {
            toastId = toast.loading("Signing you in…")
          },
          onSuccess: () => {
            toast.success("Welcome back!", { id: toastId })
          },
          onError: (ctx) => {
            toast.error(ctx.error.message, { id: toastId })
          },
        }
      )

      if (error) {
        return {
          errors: { _form: error.message },
          fields: { email },
          success: false,
        }
      }

      // Role-aware redirect
      const session = await authClient.getSession()
      if (session.data?.user.role === "admin") {
        router.push("/admin")
      } else {
        router.push("/account")
      }

      return { errors: null, fields: { email }, success: true }
    },
    { errors: null, success: false }
  )

  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="font-heading text-2xl">Welcome back</CardTitle>
        <CardDescription>
          Sign in to track orders and reorder your favourites.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action} className="space-y-4">
          <Field className="space-y-2">
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@email.com"
              disabled={pending}
              defaultValue={state.fields?.email ?? ""}
              key={`email-${state.fields?.email}`}
              aria-invalid={!!state.errors?.email}
              aria-describedby="email-error"
            />
            <FieldError id="email-error">{state.errors?.email}</FieldError>
          </Field>

          <Field className="space-y-2">
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Link
                href="/forgot-password"
                className="text-xs text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              disabled={pending}
              aria-invalid={!!state.errors?.password}
              aria-describedby="password-error"
            />
            <FieldError id="password-error">{state.errors?.password}</FieldError>
          </Field>

          <div className="flex items-center gap-2">
            <Checkbox id="remember" name="remember" disabled={pending} />
            <FieldLabel
              htmlFor="remember"
              className="text-sm font-normal text-muted-foreground"
            >
              Keep me signed in
            </FieldLabel>
          </div>

          <Button type="submit" size="lg" className="w-full" disabled={pending}>
            {pending ? "Signing in…" : "Sign in"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          New to Deelicious Bakes?{" "}
          <Link href="/sign-up" className="font-medium text-primary hover:underline">
            Create an account
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}