export type StorageObjectType = "avatar" | "product" | "review" | "generic";

export type SignedUploadResult = {
    key: string;
    uploadUrl: string;
    publicUrl?: string;
};

export type SignedDownloadResult = {
    url: string;
};

export interface StorageProvider {
    getSignedUploadUrl(params: {
        key: string;
        contentType: string;
        expiresIn?: number;
    }): Promise<SignedUploadResult>;

    getSignedDownloadUrl(params: {
        key: string;
        expiresIn?: number;
    }): Promise<SignedDownloadResult>;

    deleteObject(key: string): Promise<void>;
}