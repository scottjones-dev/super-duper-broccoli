import { Section, Text } from "react-email";
import { Layout } from "../../components/layout";
import SimpleHeader from "../../components/headers/simple";
import SimpleFooter from "../../components/footers/simple";

export interface PasswordChangedEmailProps {
    previewText: string;
    userName: string;
    logoUrl: string;
    logoAlt: string;
    logoWidth?: number;
    logoHeight?: number;
    companyName: string;
}

export const PasswordChangedEmail = ({
    previewText,
    userName,
    logoUrl,
    logoAlt,
    logoWidth,
    logoHeight,
    companyName,
}: PasswordChangedEmailProps) => (
    <Layout preview={previewText}>
        <SimpleHeader
            logoUrl={logoUrl}
            logoAlt={logoAlt}
            {...(logoWidth !== undefined ? { logoWidth } : {})}
            {...(logoHeight !== undefined ? { logoHeight } : {})}
        />
        <Section className="px-12 py-4">
            <Text className="text-foreground text-2xl font-heading font-bold mb-4 leading-tight">
                Your password has been changed
            </Text>
            <Text className="text-muted-foreground text-base font-sans mb-4 leading-relaxed">
                Hi {userName},
            </Text>
            <Text className="text-muted-foreground text-base font-sans mb-6 leading-relaxed">
                This is a security alert to confirm that the password for your account has been successfully changed.
            </Text>
            <Text className="text-primary text-sm font-sans font-bold mb-6 leading-relaxed">
                Important: If you did not make this change, please contact our support team immediately to secure your account.
            </Text>
            <Text className="text-muted-foreground text-xs font-sans leading-relaxed">
                For security reasons, we cannot revert passwords or provide old passwords. Please use the password reset system if you have been locked out of your account.
            </Text>
        </Section>
        <SimpleFooter companyName={companyName} />
    </Layout>
);

PasswordChangedEmail.PreviewProps = {
    previewText: "Security Alert: Password Changed",
    userName: "Pinky",
    logoUrl: "https://deeliciousbakes.com/logo.png",
    logoAlt: "Deelicious Bakes logo",
    logoHeight: 50,
    logoWidth: 150,
    companyName: "Deelicious Bakes",
} satisfies PasswordChangedEmailProps;

export default PasswordChangedEmail;
