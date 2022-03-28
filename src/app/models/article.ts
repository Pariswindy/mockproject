export interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: Date;
  updatedAt: Date;
  favorited: boolean;
  favoritesCount: number;
  author: {
    username: string;
    bio: string;
    image: string;
    following: boolean;
    }
  }


export interface ResponArticle {
article: Article
}
export interface OutFavorite{
article: Favorite
}
export interface Favorite {
author: {
  username: string;
  bio: string;
  image: string;
  following: boolean;
  },
  authorId:number,
  body:string,
  createdAt:Date,
  description:string,
  favorited:boolean,
  favoritedBy: FavoriteBy[],
  favoritesCount:number,
  id:number,
  slug:string,
  tagList:Array<string>;
  title:string,
  updatedAt:Date,

}
export interface FavoriteBy {
bio: string
demo: boolean
email: string
id: number
image: string
password: string
username: string
}
export interface ListArticleUser {
articles:Article[]
articlesCount: number
}
export interface Articles {
  articles: Article[];
  articlesCount: number;
}

export interface Tags {
  tags: string[],
}
