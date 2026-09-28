export interface Article {
    id: string;
    id_user: string;
    title: string;
    subtitle: string;
    body: string;
    abstract: string;
    category: 'National' | 'Technology' | 'Sports' | 'Economy';
    update_date: number
    image_data?: string;            // single article requests (details/edit)
    image_media_type?: string;
    thumbnail_data?: string;        // list requests (main page)
    thumbnail_media_type?: string;
}