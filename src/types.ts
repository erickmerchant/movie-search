import type {GraphQLResolveInfo} from "graphql";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends {[key: string]: unknown}> = {[K in keyof T]: T[K]};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<T extends {[key: string]: unknown}, K extends keyof T> = {
	[_ in K]?: never;
};
export type Incremental<T> =
	| T
	| {[P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never};
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
	[P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: {input: string; output: string};
	String: {input: string; output: string};
	Boolean: {input: boolean; output: boolean};
	Int: {input: number; output: number};
	Float: {input: number; output: number};
};

export type Genre = {
	__typename?: "Genre";
	id?: Maybe<Scalars["ID"]["output"]>;
	movies?: Maybe<Array<Maybe<Movie>>>;
	title?: Maybe<Scalars["String"]["output"]>;
};

export type GenreConnection = {
	__typename?: "GenreConnection";
	nodes?: Maybe<Array<Genre>>;
	pagination?: Maybe<Pagination>;
};

export type GenreWithoutMovies = {
	__typename?: "GenreWithoutMovies";
	id?: Maybe<Scalars["ID"]["output"]>;
	title?: Maybe<Scalars["String"]["output"]>;
};

export type Movie = {
	__typename?: "Movie";
	bestRating?: Maybe<Scalars["Float"]["output"]>;
	datePublished?: Maybe<Scalars["String"]["output"]>;
	directors?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
	duration?: Maybe<Scalars["String"]["output"]>;
	genres?: Maybe<Array<Maybe<GenreWithoutMovies>>>;
	id?: Maybe<Scalars["ID"]["output"]>;
	mainActors?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
	posterUrl?: Maybe<Scalars["String"]["output"]>;
	rating?: Maybe<Scalars["String"]["output"]>;
	ratingValue?: Maybe<Scalars["Float"]["output"]>;
	summary?: Maybe<Scalars["String"]["output"]>;
	title?: Maybe<Scalars["String"]["output"]>;
	worstRating?: Maybe<Scalars["Float"]["output"]>;
	writers?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
};

export type MovieConnection = {
	__typename?: "MovieConnection";
	nodes?: Maybe<Array<Movie>>;
	pagination?: Maybe<Pagination>;
};

export type MovieFilterInput = {
	genre?: InputMaybe<Scalars["String"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
};

export type Pagination = {
	__typename?: "Pagination";
	page: Scalars["Int"]["output"];
	perPage: Scalars["Int"]["output"];
	totalPages: Scalars["Int"]["output"];
};

export type PaginationInput = {
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
};

export type Query = {
	__typename?: "Query";
	/** Single Genre by ID */
	genre?: Maybe<Genre>;
	/** Paginated list of Genres */
	genres?: Maybe<GenreConnection>;
	/** Single Movie by ID */
	movie?: Maybe<Movie>;
	/** Paginated list of Movies with simple search */
	movies?: Maybe<MovieConnection>;
};

export type QueryGenreArgs = {
	id: Scalars["ID"]["input"];
};

export type QueryGenresArgs = {
	pagination?: InputMaybe<PaginationInput>;
};

export type QueryMovieArgs = {
	id: Scalars["ID"]["input"];
};

export type QueryMoviesArgs = {
	pagination?: InputMaybe<PaginationInput>;
	where?: InputMaybe<MovieFilterInput>;
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
	resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
	| ResolverFn<TResult, TParent, TContext, TArgs>
	| ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
	TResult,
	TKey extends string,
	TParent,
	TContext,
	TArgs
> {
	subscribe: SubscriptionSubscribeFn<
		{[key in TKey]: TResult},
		TParent,
		TContext,
		TArgs
	>;
	resolve?: SubscriptionResolveFn<
		TResult,
		{[key in TKey]: TResult},
		TContext,
		TArgs
	>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
	subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
	resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
	TResult,
	TKey extends string,
	TParent,
	TContext,
	TArgs
> =
	| SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
	| SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
	TResult,
	TKey extends string,
	TParent = {},
	TContext = {},
	TArgs = {}
> =
	| ((
			...args: any[]
	  ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
	| SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
	parent: TParent,
	context: TContext,
	info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
	obj: T,
	context: TContext,
	info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
	TResult = {},
	TParent = {},
	TContext = {},
	TArgs = {}
> = (
	next: NextResolverFn<TResult>,
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
	Boolean: ResolverTypeWrapper<Scalars["Boolean"]["output"]>;
	Float: ResolverTypeWrapper<Scalars["Float"]["output"]>;
	Genre: ResolverTypeWrapper<Genre>;
	GenreConnection: ResolverTypeWrapper<GenreConnection>;
	GenreWithoutMovies: ResolverTypeWrapper<GenreWithoutMovies>;
	ID: ResolverTypeWrapper<Scalars["ID"]["output"]>;
	Int: ResolverTypeWrapper<Scalars["Int"]["output"]>;
	Movie: ResolverTypeWrapper<Movie>;
	MovieConnection: ResolverTypeWrapper<MovieConnection>;
	MovieFilterInput: MovieFilterInput;
	Pagination: ResolverTypeWrapper<Pagination>;
	PaginationInput: PaginationInput;
	Query: ResolverTypeWrapper<{}>;
	String: ResolverTypeWrapper<Scalars["String"]["output"]>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
	Boolean: Scalars["Boolean"]["output"];
	Float: Scalars["Float"]["output"];
	Genre: Genre;
	GenreConnection: GenreConnection;
	GenreWithoutMovies: GenreWithoutMovies;
	ID: Scalars["ID"]["output"];
	Int: Scalars["Int"]["output"];
	Movie: Movie;
	MovieConnection: MovieConnection;
	MovieFilterInput: MovieFilterInput;
	Pagination: Pagination;
	PaginationInput: PaginationInput;
	Query: {};
	String: Scalars["String"]["output"];
};

export type GenreResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes["Genre"] = ResolversParentTypes["Genre"]
> = {
	id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
	movies?: Resolver<
		Maybe<Array<Maybe<ResolversTypes["Movie"]>>>,
		ParentType,
		ContextType
	>;
	title?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GenreConnectionResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes["GenreConnection"] = ResolversParentTypes["GenreConnection"]
> = {
	nodes?: Resolver<
		Maybe<Array<ResolversTypes["Genre"]>>,
		ParentType,
		ContextType
	>;
	pagination?: Resolver<
		Maybe<ResolversTypes["Pagination"]>,
		ParentType,
		ContextType
	>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GenreWithoutMoviesResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes["GenreWithoutMovies"] = ResolversParentTypes["GenreWithoutMovies"]
> = {
	id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
	title?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MovieResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes["Movie"] = ResolversParentTypes["Movie"]
> = {
	bestRating?: Resolver<
		Maybe<ResolversTypes["Float"]>,
		ParentType,
		ContextType
	>;
	datePublished?: Resolver<
		Maybe<ResolversTypes["String"]>,
		ParentType,
		ContextType
	>;
	directors?: Resolver<
		Maybe<Array<Maybe<ResolversTypes["String"]>>>,
		ParentType,
		ContextType
	>;
	duration?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
	genres?: Resolver<
		Maybe<Array<Maybe<ResolversTypes["GenreWithoutMovies"]>>>,
		ParentType,
		ContextType
	>;
	id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
	mainActors?: Resolver<
		Maybe<Array<Maybe<ResolversTypes["String"]>>>,
		ParentType,
		ContextType
	>;
	posterUrl?: Resolver<
		Maybe<ResolversTypes["String"]>,
		ParentType,
		ContextType
	>;
	rating?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
	ratingValue?: Resolver<
		Maybe<ResolversTypes["Float"]>,
		ParentType,
		ContextType
	>;
	summary?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
	title?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
	worstRating?: Resolver<
		Maybe<ResolversTypes["Float"]>,
		ParentType,
		ContextType
	>;
	writers?: Resolver<
		Maybe<Array<Maybe<ResolversTypes["String"]>>>,
		ParentType,
		ContextType
	>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MovieConnectionResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes["MovieConnection"] = ResolversParentTypes["MovieConnection"]
> = {
	nodes?: Resolver<
		Maybe<Array<ResolversTypes["Movie"]>>,
		ParentType,
		ContextType
	>;
	pagination?: Resolver<
		Maybe<ResolversTypes["Pagination"]>,
		ParentType,
		ContextType
	>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaginationResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes["Pagination"] = ResolversParentTypes["Pagination"]
> = {
	page?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
	perPage?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
	totalPages?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
	genre?: Resolver<
		Maybe<ResolversTypes["Genre"]>,
		ParentType,
		ContextType,
		RequireFields<QueryGenreArgs, "id">
	>;
	genres?: Resolver<
		Maybe<ResolversTypes["GenreConnection"]>,
		ParentType,
		ContextType,
		Partial<QueryGenresArgs>
	>;
	movie?: Resolver<
		Maybe<ResolversTypes["Movie"]>,
		ParentType,
		ContextType,
		RequireFields<QueryMovieArgs, "id">
	>;
	movies?: Resolver<
		Maybe<ResolversTypes["MovieConnection"]>,
		ParentType,
		ContextType,
		Partial<QueryMoviesArgs>
	>;
};

export type Resolvers<ContextType = any> = {
	Genre?: GenreResolvers<ContextType>;
	GenreConnection?: GenreConnectionResolvers<ContextType>;
	GenreWithoutMovies?: GenreWithoutMoviesResolvers<ContextType>;
	Movie?: MovieResolvers<ContextType>;
	MovieConnection?: MovieConnectionResolvers<ContextType>;
	Pagination?: PaginationResolvers<ContextType>;
	Query?: QueryResolvers<ContextType>;
};
