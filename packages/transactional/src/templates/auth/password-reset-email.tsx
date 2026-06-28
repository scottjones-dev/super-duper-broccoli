import { Button, Section, Text } from "react-email";
import { Layout } from "../../components/layout";
import SimpleHeader from "../../components/headers/simple";
import SimpleFooter from "../../components/footers/simple";

export interface PasswordResetEmailProps {
    previewText: string;
    userName: string;
    resetUrl: string;
    logoUrl: string;
    logoAlt: string;
    logoWidth?: number;
    logoHeight?: number;
    companyName: string;
}

export const PasswordResetEmail = ({
    previewText,
    userName,
    resetUrl,
    logoUrl,
    logoAlt,
    logoWidth,
    logoHeight,
    companyName,
}: PasswordResetEmailProps) => (
    <Layout preview={previewText}>
        <SimpleHeader
            logoUrl={logoUrl}
            logoAlt={logoAlt}
            {...(logoWidth !== undefined ? { logoWidth } : {})}
            {...(logoHeight !== undefined ? { logoHeight } : {})}
        />
        <Section className="px-12 py-4">
            <Text className="text-foreground text-2xl font-heading font-bold mb-4 leading-tight">
                Reset your password
            </Text>
            <Text className="text-muted-foreground text-base font-sans mb-4 leading-relaxed">
                Hi {userName},
            </Text>
            <Text className="text-muted-foreground text-base font-sans mb-6 leading-relaxed">
                We received a request to reset the password for your account. Please click the button below to set a new password.
            </Text>
            <Section className="mb-6">
                <Button
                    className="bg-background text-primary border border-border font-sans font-bold text-sm px-6 py-3 rounded-md no-underline text-center inline-block"
                    href={resetUrl}
                >
                    Reset password
                </Button>
            </Section>
            <Text className="text-muted-foreground text-xs font-sans leading-relaxed">
                If you did not request a password reset, you can safely ignore this email. Your password will remain unchanged.
            </Text>
        </Section>
        <SimpleFooter companyName={companyName} />
    </Layout>
);

PasswordResetEmail.PreviewProps = {
    previewText: "Reset your Deelicious Bakes account password",
    userName: "Pinky",
    resetUrl: "https://deeliciousbakes.com/reset?token=xyz123",
    logoUrl: "https://deeliciousbakes.com/logo.png",
    logoAlt: "Deelicious Bakes logo",
    logoHeight: 50,
    logoWidth: 150,
    companyName: "Deelicious Bakes",
} satisfies PasswordResetEmailProps;

export default PasswordResetEmail;
