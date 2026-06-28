import { Button, Img, Section, Text } from "react-email";
import { Layout } from "../layout";

export interface ProductCardProps {
    previewText: string;
    title: string;
    description: string;
    price: string;
    imageUrl: string;
    imageAlt: string;
    href: string;
    buttonLabel: string;
}

export const ProductCard = ({
    previewText,
    title,
    description,
    price,
    imageUrl,
    imageAlt,
    href,
    buttonLabel,
}: ProductCardProps) => (
    <Layout preview={previewText}>
        <Section className="px-12 py-4 text-center">
            <Img
                src={imageUrl}
                alt={imageAlt}
                className="w-full rounded-lg h-auto block mb-4"
            />
            <Text className="text-foreground text-2xl font-heading font-bold mb-1 leading-tight">
                {title}
            </Text>
            <Text className="text-primary text-xl font-sans font-bold mb-3">
                {price}
            </Text>
            <Text className="text-muted-foreground text-sm font-sans mb-6 leading-relaxed">
                {description}
            </Text>
            <Button
                className="bg-background text-primary border border-border font-sans font-bold text-sm px-6 py-3 rounded-md no-underline text-center inline-block"
                href={href}
            >
                {buttonLabel}
            </Button>
        </Section>
    </Layout>
);

export default ProductCard;
