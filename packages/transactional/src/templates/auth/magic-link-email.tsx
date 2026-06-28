import { Button, Section, Text } from "react-email";
import { Layout } from "../../components/layout";
import SimpleHeader from "../../components/headers/simple";

export interface MagicLinkEmailProps {
    previewText: string;
    userName: string;
    loginUrl: string;
    logoUrl: string;
    logoAlt: string;
    logoWidth?: number;
    logoHeight?: number;
}

export const MagicLinkEmail = ({
    previewText,
    userName,
    loginUrl,
    logoUrl,
    logoAlt,
    logoWidth,
    logoHeight,
}: MagicLinkEmailProps) => (
    <Layout preview={previewText}>
        <SimpleHeader
            logoUrl={logoUrl}
            logoAlt={logoAlt}
            {...(logoWidth !== undefined ? { logoWidth } : {})}
            {...(logoHeight !== undefined ? { logoHeight } : {})}
        />
        <Section className="px-12 py-4">
            <Text className="text-foreground text-2xl font-heading font-bold mb-4 leading-tight">
                Sign in to your account
            </Text>
            <Text className="text-muted-foreground text-base font-sans mb-4 leading-relaxed">
                Hi {userName},
            </Text>
            <Text className="text-muted-foreground text-base font-sans mb-6 leading-relaxed">
                Click the button below to sign in instantly to your account. This link will expire shortly and can only be used once.
            </Text>
            <Section className="mb-6">
                <Button
                    className="bg-background text-primary border border-border font-sans font-bold text-sm px-6 py-3 rounded-md no-underline text-center inline-block"
                    href={loginUrl}
                >
                    Sign in
                </Button>
            </Section>
            <Text className="text-muted-foreground text-xs font-sans leading-relaxed">
                If you did not request this sign-in link, you can safely ignore this email.
            </Text>
        </Section>
    </Layout>
);

MagicLinkEmail.PreviewProps = {
    previewText: "Sign in to your Deelicious Bakes account",
    userName: "Pinky",
    loginUrl: "https://deeliciousbakes.com/login?token=xyz123",
    logoUrl: "https://deeliciousbakes.com/logo.png",
    logoAlt: "Deelicious Bakes logo",
    logoHeight: 50,
    logoWidth: 150,
} satisfies MagicLinkEmailProps;

export default MagicLinkEmail;
