import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import type { StorageProvider } from "../types";

export class R2Provider implements StorageProvider {
    private client: S3Client;
    private bucket: string;
    private endpoint: string;

    constructor() {
        this.bucket = process.env.R2_BUCKET!;
        this.endpoint = process.env.R2_ENDPOINT!;

        this.client = new S3Client({
            region: "auto",
            endpoint: this.endpoint,
            credentials: {
                accessKeyId: process.env.R2_ACCESS_KEY!,
                secretAccessKey: process.env.R2_SECRET_KEY!,
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
        await this.client.send(
            new DeleteObjectCommand({
                Bucket: this.bucket,
                Key: key,
            })
        );
    }
}