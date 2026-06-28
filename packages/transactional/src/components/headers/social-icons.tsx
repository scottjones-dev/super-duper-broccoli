import { Column, Img, Link, Row, Section } from "react-email";

export interface SocialIconHeaderItem {
    alt: string;
    href: string;
    iconUrl: string;
}

export interface SocialIconsHeaderProps {
    logoUrl: string;
    logoAlt: string;
    logoWidth?: number;
    logoHeight?: number;
    socials: SocialIconHeaderItem[];
}

export const SocialIconsHeader = ({ logoUrl, logoAlt, logoWidth = 120, logoHeight = 40, socials, }: SocialIconsHeaderProps) => (
    <Section className="px-12 pt-8 pb-6">
        <Row>
            <Column className="w-[70%]">
                <Img
                    src={logoUrl}
                    alt={logoAlt}
                    width={logoWidth}
                    height={logoHeight}
                />
            </Column>

            <Column align="right">
                <Row align="right">
                    {socials.map((social) => (
                        <Column key={`${social.alt}-${social.href}`}>
                            <Link href={social.href}>
                                <Img
                                    src={social.iconUrl}
                                    alt={social.alt}
                                    width="24"
                                    height="24"
                                    className="mx-1"
                                />
                            </Link>
                        </Column>
                    ))}
                </Row>
            </Column>
        </Row>
    </Section>
);

export default SocialIconsHeader;