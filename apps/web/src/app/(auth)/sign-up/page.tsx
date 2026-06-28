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

interface SignUpFormState {
  errors?: {
    _form?: string
    name?: string
    email?: string
    password?: string
    confirm?: string
  } | null
  fields?: {
    name?: string
    email?: string
  }
  success?: boolean
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function SignUpPage() {
  const router = useRouter()

  useEffect(() => {
    authClient.getSession().then((session) => {
      if (session.data?.user.role === "admin") router.push("/admin")
      else if (session.data?.user) router.push("/account")
    })
  }, [router])

  const [state, action, pending] = useActionState<SignUpFormState, FormData>(
    async (_prev, formData) => {
      const name = (formData.get("name") as string).trim()
      const email = (formData.get("email") as string).trim()
      const password = formData.get("password") as string
      const confirm = formData.get("confirm") as string

      // ── Client-side validation ──────────────────────────────────────────
      const validationErrors: NonNullable<SignUpFormState["errors"]> = {}

      if (!name) validationErrors.name = "Full name is required."

      if (!email) {
        validationErrors.email = "Email is required."
      } else if (!EMAIL_RE.test(email)) {
        validationErrors.email = "Please enter a valid email address."
      }

      if (!password) {
        validationErrors.password = "Password is required."
      } else if (password.length < 8) {
        validationErrors.password = "Password must be at least 8 characters."
      }

      if (password && !confirm) {
        validationErrors.confirm = "Please confirm your password."
      } else if (password && confirm && password !== confirm) {
        validationErrors.confirm = "Passwords do not match."
      }

      if (Object.keys(validationErrors).length > 0) {
        return { errors: validationErrors, fields: { name, email }, success: false }
      }

      // ── API call ────────────────────────────────────────────────────────
      let toastId: string | number | undefined

      const { error } = await authClient.signUp.email(
        {
          name,
          email,
          password,
          callbackURL: "/account",
        },
        {
          onRequest: () => {
            toastId = toast.loading("Creating your account…")
          },
          onSuccess: () => {
            toast.success("Account created! Please check your email to verify.", {
              id: toastId,
              duration: 6000,
            })
          },
          onError: (ctx) => {
            toast.error(ctx.error.message, { id: toastId })
          },
        }
      )

      if (error) {
        return {
          errors: { _form: error.message },
          fields: { name, email },
          success: false,
        }
      }

      router.push("/verify-email")
      return { errors: null, fields: { name, email }, success: true }
    },
    { errors: null, success: false }
  )

  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="font-heading text-2xl">Create your account</CardTitle>
        <CardDescription>
          Join us for faster checkout and sweet member perks.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action} className="space-y-4">
          <Field className="space-y-2">
            <FieldLabel htmlFor="name">Full name</FieldLabel>
            <Input
              id="name"
              name="name"
              placeholder="Jane Baker"
              disabled={pending}
              defaultValue={state.fields?.name ?? ""}
              key={`name-${state.fields?.name}`}
              aria-invalid={!!state.errors?.name}
              aria-describedby="name-error"
            />
            <FieldError id="name-error">{state.errors?.name}</FieldError>
          </Field>

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
            <FieldLabel htmlFor="password">Password</FieldLabel>
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

          <Field className="space-y-2">
            <FieldLabel htmlFor="confirm">Confirm password</FieldLabel>
            <Input
              id="confirm"
              name="confirm"
              type="password"
              placeholder="••••••••"
              disabled={pending}
              aria-invalid={!!state.errors?.confirm}
              aria-describedby="confirm-error"
            />
            <FieldError id="confirm-error">{state.errors?.confirm}</FieldError>
          </Field>

          <div className="flex items-start gap-2">
            <Checkbox id="marketing" name="marketing" className="mt-0.5" disabled={pending} />
            <FieldLabel
              htmlFor="marketing"
              className="text-sm leading-relaxed font-normal text-muted-foreground"
            >
              Send me occasional news about new bakes and seasonal offers.
            </FieldLabel>
          </div>

          <Button type="submit" size="lg" className="w-full" disabled={pending}>
            {pending ? "Creating account…" : "Create account"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/sign-in" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}