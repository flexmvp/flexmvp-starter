import {FieldsSelection,Observable} from '@genql/runtime'

export type Scalars = {
    ID: string,
    String: string,
    Boolean: boolean,
}

export interface Article {
    comments: Comment[]
    id: Scalars['ID']
    title: Scalars['String']
    url: Scalars['String']
    __typename: 'Article'
}


/** Authentication response object */
export interface Auth {
    /** HTTP status code */
    code: Scalars['String']
    /** Status of the request */
    status: Scalars['String']
    __typename: 'Auth'
}

export interface Comment {
    id: Scalars['ID']
    text: Scalars['String']
    __typename: 'Comment'
}

export interface Mutation {
    addComment: Comment
    createArticle: Article
    deleteArticle: Article
    updateArticle: Article
    verify: Auth
    __typename: 'Mutation'
}

export interface Query {
    getArticle: Article
    listArticles: Article[]
    me: Scalars['String']
    __typename: 'Query'
}

export interface ArticleRequest{
    comments?: CommentRequest
    id?: boolean | number
    title?: boolean | number
    url?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Authentication response object */
export interface AuthRequest{
    /** HTTP status code */
    code?: boolean | number
    /** Status of the request */
    status?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface CommentRequest{
    id?: boolean | number
    text?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface MutationRequest{
    addComment?: [{articleId: Scalars['String'],text: Scalars['String']},CommentRequest]
    createArticle?: [{title: Scalars['String'],url: Scalars['String']},ArticleRequest]
    deleteArticle?: [{articleId: Scalars['String']},ArticleRequest]
    updateArticle?: [{articleId: Scalars['String'],title: Scalars['String'],url: Scalars['String']},ArticleRequest]
    verify?: [{confirmationCode: Scalars['String'],emailAddress: Scalars['String']},AuthRequest]
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface QueryRequest{
    getArticle?: [{articleId: Scalars['String']},ArticleRequest]
    listArticles?: ArticleRequest
    me?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


const Article_possibleTypes: string[] = ['Article']
export const isArticle = (obj?: { __typename?: any } | null): obj is Article => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isArticle"')
  return Article_possibleTypes.includes(obj.__typename)
}



const Auth_possibleTypes: string[] = ['Auth']
export const isAuth = (obj?: { __typename?: any } | null): obj is Auth => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isAuth"')
  return Auth_possibleTypes.includes(obj.__typename)
}



const Comment_possibleTypes: string[] = ['Comment']
export const isComment = (obj?: { __typename?: any } | null): obj is Comment => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isComment"')
  return Comment_possibleTypes.includes(obj.__typename)
}



const Mutation_possibleTypes: string[] = ['Mutation']
export const isMutation = (obj?: { __typename?: any } | null): obj is Mutation => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isMutation"')
  return Mutation_possibleTypes.includes(obj.__typename)
}



const Query_possibleTypes: string[] = ['Query']
export const isQuery = (obj?: { __typename?: any } | null): obj is Query => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isQuery"')
  return Query_possibleTypes.includes(obj.__typename)
}


export interface ArticlePromiseChain{
    comments: ({get: <R extends CommentRequest>(request: R, defaultValue?: FieldsSelection<Comment, R>[]) => Promise<FieldsSelection<Comment, R>[]>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    title: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    url: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface ArticleObservableChain{
    comments: ({get: <R extends CommentRequest>(request: R, defaultValue?: FieldsSelection<Comment, R>[]) => Observable<FieldsSelection<Comment, R>[]>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    title: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    url: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}


/** Authentication response object */
export interface AuthPromiseChain{
    
/** HTTP status code */
code: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    
/** Status of the request */
status: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}


/** Authentication response object */
export interface AuthObservableChain{
    
/** HTTP status code */
code: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    
/** Status of the request */
status: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}

export interface CommentPromiseChain{
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    text: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface CommentObservableChain{
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    text: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}

export interface MutationPromiseChain{
    addComment: ((args: {articleId: Scalars['String'],text: Scalars['String']}) => CommentPromiseChain & {get: <R extends CommentRequest>(request: R, defaultValue?: FieldsSelection<Comment, R>) => Promise<FieldsSelection<Comment, R>>}),
    createArticle: ((args: {title: Scalars['String'],url: Scalars['String']}) => ArticlePromiseChain & {get: <R extends ArticleRequest>(request: R, defaultValue?: FieldsSelection<Article, R>) => Promise<FieldsSelection<Article, R>>}),
    deleteArticle: ((args: {articleId: Scalars['String']}) => ArticlePromiseChain & {get: <R extends ArticleRequest>(request: R, defaultValue?: FieldsSelection<Article, R>) => Promise<FieldsSelection<Article, R>>}),
    updateArticle: ((args: {articleId: Scalars['String'],title: Scalars['String'],url: Scalars['String']}) => ArticlePromiseChain & {get: <R extends ArticleRequest>(request: R, defaultValue?: FieldsSelection<Article, R>) => Promise<FieldsSelection<Article, R>>}),
    verify: ((args: {confirmationCode: Scalars['String'],emailAddress: Scalars['String']}) => AuthPromiseChain & {get: <R extends AuthRequest>(request: R, defaultValue?: FieldsSelection<Auth, R>) => Promise<FieldsSelection<Auth, R>>})
}

export interface MutationObservableChain{
    addComment: ((args: {articleId: Scalars['String'],text: Scalars['String']}) => CommentObservableChain & {get: <R extends CommentRequest>(request: R, defaultValue?: FieldsSelection<Comment, R>) => Observable<FieldsSelection<Comment, R>>}),
    createArticle: ((args: {title: Scalars['String'],url: Scalars['String']}) => ArticleObservableChain & {get: <R extends ArticleRequest>(request: R, defaultValue?: FieldsSelection<Article, R>) => Observable<FieldsSelection<Article, R>>}),
    deleteArticle: ((args: {articleId: Scalars['String']}) => ArticleObservableChain & {get: <R extends ArticleRequest>(request: R, defaultValue?: FieldsSelection<Article, R>) => Observable<FieldsSelection<Article, R>>}),
    updateArticle: ((args: {articleId: Scalars['String'],title: Scalars['String'],url: Scalars['String']}) => ArticleObservableChain & {get: <R extends ArticleRequest>(request: R, defaultValue?: FieldsSelection<Article, R>) => Observable<FieldsSelection<Article, R>>}),
    verify: ((args: {confirmationCode: Scalars['String'],emailAddress: Scalars['String']}) => AuthObservableChain & {get: <R extends AuthRequest>(request: R, defaultValue?: FieldsSelection<Auth, R>) => Observable<FieldsSelection<Auth, R>>})
}

export interface QueryPromiseChain{
    getArticle: ((args: {articleId: Scalars['String']}) => ArticlePromiseChain & {get: <R extends ArticleRequest>(request: R, defaultValue?: FieldsSelection<Article, R>) => Promise<FieldsSelection<Article, R>>}),
    listArticles: ({get: <R extends ArticleRequest>(request: R, defaultValue?: FieldsSelection<Article, R>[]) => Promise<FieldsSelection<Article, R>[]>}),
    me: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface QueryObservableChain{
    getArticle: ((args: {articleId: Scalars['String']}) => ArticleObservableChain & {get: <R extends ArticleRequest>(request: R, defaultValue?: FieldsSelection<Article, R>) => Observable<FieldsSelection<Article, R>>}),
    listArticles: ({get: <R extends ArticleRequest>(request: R, defaultValue?: FieldsSelection<Article, R>[]) => Observable<FieldsSelection<Article, R>[]>}),
    me: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}