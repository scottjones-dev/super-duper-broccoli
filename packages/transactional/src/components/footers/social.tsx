import { Hr, Img, Link, Section, Text } from "react-email";

export interface SocialFooterItem {
    alt: string;
    href: string;
    iconUrl: string;
}

export interface SocialFooterProps {
    companyName: string;
    socials: SocialFooterItem[];
}

export const SocialFooter = ({ companyName, socials, }: SocialFooterProps) => (
    <Section className="px-12 pb-8">
        <Hr className="border-border my-5" />

        {socials.length > 0 && (
            <Section className="text-center pb-4">
                {socials.map((social) => (
                    <Link key={`${social.alt}-${social.href}`} href={social.href}>
                        <Img src={social.iconUrl} alt={social.alt} width="24" height="24" className="inline-block mx-2" />
                    </Link>
                ))}
            </Section>
        )}

        <Text className="text-muted-foreground text-xs leading-5 text-center">
            © {new Date().getFullYear()} {companyName}. All rights reserved.
        </Text>
    </Section>
);

export default SocialFooter;