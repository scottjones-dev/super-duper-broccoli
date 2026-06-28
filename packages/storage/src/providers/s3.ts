import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import type { StorageProvider } from "../types";

export class S3Provider implements StorageProvider {
    private client: S3Client;
    private bucket: string;

    constructor() {
        this.bucket = process.env.S3_BUCKET!;
        this.client = new S3Client({
            region: process.env.S3_REGION!,
            credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY!,
                secretAccessKey: process.env.S3_SECRET_KEY!,
            },
        });
    }

    async getSignedUploadUrl({ key, contentType, expiresIn = 60 }: any) {
        const command = new PutObjectCommand({
            Bucket: this.bucket,
            Key: key,
            ContentType: contentType,
        });

        const uploadUrl = await getSignedUrl(this.client, command, {
            expiresIn,
        });

        return { key, uploadUrl };
    }

    async getSignedDownloadUrl({ key, expiresIn = 60 }: any) {
        const command = new GetObjectCommand({
            Bucket: this.bucket,
            Key: key,
        });

        const url = await getSignedUrl(this.client, command, {
            expiresIn,
        });

        return { url };
    }

    async deleteObject(key: string) {
        await this.client.send({
            Bucket: this.bucket,
            Key: key,
        } as any);
    }
}