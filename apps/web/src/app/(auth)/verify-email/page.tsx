"use client"

import { useActionState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { MailCheck } from "lucide-react"
import { authClient } from "@/lib/auth-client"
import { Button } from "@deeliciousbakes/ui/components/button"
import { Input } from "@deeliciousbakes/ui/components/input"
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

interface ResendState {
    errors?: { email?: string } | null
    fields?: { email?: string }
    sent?: boolean
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function VerifyEmailPage() {
    const router = useRouter()

    // If already verified / signed in, skip this page
    useEffect(() => {
        authClient.getSession().then((session) => {
            if (session.data?.user.emailVerified) {
                if (session.data.user.role === "admin") router.push("/admin")
                else router.push("/account")
            }
        })
    }, [router])

    const [state, action, pending] = useActionState<ResendState, FormData>(
        async (_prev, formData) => {
            const email = (formData.get("email") as string).trim()

            if (!email) {
                return { errors: { email: "Email is required." }, sent: false }
            }
            if (!EMAIL_RE.test(email)) {
                return {
                    errors: { email: "Please enter a valid email address." },
                    fields: { email },
                    sent: false,
                }
            }

            let toastId: string | number | undefined

            const { error } = await authClient.sendVerificationEmail(
                { email, callbackURL: "/account" },
                {
                    onRequest: () => {
                        toastId = toast.loading("Sending verification email…")
                    },
                    onSuccess: () => {
                        toast.success("Verification email sent! Check your inbox.", {
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
                return { errors: { email: error.message }, fields: { email }, sent: false }
            }

            return { errors: null, fields: { email }, sent: true }
        },
        { errors: null, sent: false }
    )

    return (
        <Card className="border-border/60 shadow-sm">
            <CardHeader className="space-y-3 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <MailCheck className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="font-heading text-2xl">Check your email</CardTitle>
                <CardDescription>
                    We sent a verification link to your email address. Click it to
                    activate your account.
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
                <p className="text-center text-sm text-muted-foreground">
                    Didn&apos;t receive it? Check your spam folder or resend below.
                </p>

                <form action={action} className="space-y-4">
                    <Field className="space-y-2">
                        <FieldLabel htmlFor="email">Email address</FieldLabel>
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

                    <Button
                        type="submit"
                        variant="outline"
                        size="lg"
                        className="w-full"
                        disabled={pending}
                    >
                        {pending ? "Sending…" : state.sent ? "Resend email" : "Send verification email"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}