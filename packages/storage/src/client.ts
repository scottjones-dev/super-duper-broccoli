import { S3Provider } from "./providers/s3";
import { R2Provider } from "./providers/r2";
import type { StorageProvider, StorageObjectType } from "./types";

class StorageClient {
    private provider: StorageProvider;

    constructor() {
        const driver = process.env.STORAGE_DRIVER;

        this.provider =
            driver === "r2"
                ? new R2Provider()
                : new S3Provider();
    }

    private buildKey(type: StorageObjectType, filename: string) {
        const id = crypto.randomUUID();
        return `${type}/${id}-${filename}`;
    }

    async createUpload(params: {
        type: StorageObjectType;
        filename: string;
        contentType: string;
    }) {
        const key = this.buildKey(params.type, params.filename);

        return this.provider.getSignedUploadUrl({
            key,
            contentType: params.contentType,
        });
    }

    async createDownload(key: string) {
        return this.provider.getSignedDownloadUrl({
            key,
        });
    }

    async delete(key: string) {
        return this.provider.deleteObject(key);
    }
}

export const storage = new StorageClient();