import { Button, Section, Text } from "react-email";
import { Layout } from "../../components/layout";
import SimpleHeader from "../../components/headers/simple";
import SimpleFooter from "../../components/footers/simple";

export interface VerificationEmailProps {
    previewText: string;
    userName: string;
    verifyUrl: string;
    logoUrl: string;
    logoAlt: string;
    logoWidth?: number;
    logoHeight?: number;
    companyName: string;
}

export const VerificationEmail = ({
    previewText,
    userName,
    verifyUrl,
    logoUrl,
    logoAlt,
    logoWidth,
    logoHeight,
    companyName,
}: VerificationEmailProps) => (
    <Layout preview={previewText}>
        <SimpleHeader
            logoUrl={logoUrl}
            logoAlt={logoAlt}
            {...(logoWidth !== undefined ? { logoWidth } : {})}
            {...(logoHeight !== undefined ? { logoHeight } : {})}
        />
        <Section className="px-12 py-4">
            <Text className="text-foreground text-2xl font-heading font-bold mb-4 leading-tight">
                Verify your email address
            </Text>
            <Text className="text-muted-foreground text-base font-sans mb-4 leading-relaxed">
                Hi {userName},
            </Text>
            <Text className="text-muted-foreground text-base font-sans mb-6 leading-relaxed">
                Thank you for creating an account. Please click the button below to verify your email address and activate your account.
            </Text>
            <Section className="mb-6">
                <Button
                    className="bg-background text-primary border border-border font-sans font-bold text-sm px-6 py-3 rounded-md no-underline text-center inline-block"
                    href={verifyUrl}
                >
                    Verify email
                </Button>
            </Section>
            <Text className="text-muted-foreground text-xs font-sans leading-relaxed">
                If you did not request this email, you can safely ignore it.
            </Text>
        </Section>
        <SimpleFooter companyName={companyName} />
    </Layout>
);

VerificationEmail.PreviewProps = {
    previewText: "Verify your email to activate your account",
    userName: "Pinky",
    verifyUrl: "https://deeliciousbakes.com/verify?token=abcde",
    logoUrl: "https://deeliciousbakes.com/logo.png",
    logoAlt: "Deelicious Bakes logo",
    logoHeight: 50,
    logoWidth: 150,
    companyName: "Deelicious Bakes",
} satisfies VerificationEmailProps;

export default VerificationEmail;
