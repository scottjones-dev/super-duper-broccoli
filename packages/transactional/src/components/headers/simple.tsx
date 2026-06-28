import { Img, Section } from "react-email";

interface SimpleHeaderProps {
    logoUrl: string;
    logoAlt: string;
    logoWidth?: number;
    logoHeight?: number;
}

export const SimpleHeader = ({ logoUrl, logoAlt, logoWidth = 120, logoHeight = 40, }: SimpleHeaderProps) => (

    <Section className="px-12 pt-8 pb-4 text-center">
        <Img
            src={logoUrl}
            width={logoWidth}
            height={logoHeight}
            alt={logoAlt}
            className="mx-auto"
        />
    </Section>
);

export default SimpleHeader;