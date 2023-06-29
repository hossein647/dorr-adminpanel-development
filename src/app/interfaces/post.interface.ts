export interface Post {     
    title: string;
    content: string;
    imageUrl: string;
    tags: string[];
    status: 'published' | 'unPublished';
}