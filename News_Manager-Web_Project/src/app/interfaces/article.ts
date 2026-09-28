export interface Article {
    id: string;
    id_user: string;
    title: string;
    subtitle: string;
    body: string;
    abstract: string;
    category: 'National' | 'Technology' | 'Sports' | 'Economy';
    update_date: number

    thumbnail_image?: string;
    thumbnail_media_type?: string;
    image_data?: string;
    image_media_type?: string;
    username?: string;
    is_public?: boolean;
    is_deleted?: boolean;
}