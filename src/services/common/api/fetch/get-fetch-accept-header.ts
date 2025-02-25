export const getFetchAcceptHeader = (supportFlatJson?: boolean): string =>
	supportFlatJson ? 'application/x-flat-json+json' : 'application/json';
