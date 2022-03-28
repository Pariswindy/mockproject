export interface Comment {
    id: number;
    createdAt: string;
    updatedAt: string;
    body: string;
    author: {
        username: string;
        bio: string;
        image: string;
        following: boolean;
    }
}
export interface outComment {
  comments: Comment[]
}
export interface oneComment{
  comment: Comment
}
