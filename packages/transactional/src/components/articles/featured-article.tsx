import { Button, Img, Section, Text } from "react-email";
import { Layout } from "../layout";

export interface FeaturedArticleProps {
    previewText: string;
    title: string;
    description: string;
    imageUrl: string;
    imageAlt: string;
    category: string;
    readTime: string;
    href: string;
    buttonLabel: string;
}

export const FeaturedArticle = ({
    previewText,
    title,
    description,
    imageUrl,
    imageAlt,
    category,
    readTime,
    href,
    buttonLabel,
}: FeaturedArticleProps) => (
    <Layout preview={previewText}>
        <Section className="px-12 py-4">
            <Img
                src={imageUrl}
                alt={imageAlt}
                className="w-full rounded-lg h-auto block mb-4"
            />
            <Text className="text-primary text-xs font-sans font-bold uppercase tracking-wider mb-2">
                {category} • {readTime}
            </Text>
            <Text className="text-foreground text-2xl font-heading font-bold mb-3 leading-tight">
                {title}
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

export default FeaturedArticle;
