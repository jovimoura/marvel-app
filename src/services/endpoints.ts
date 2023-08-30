import { API_HASH_KEY, API_PUBLIC_KEY } from "./api";

export const keys = `?ts=1&apikey=${API_PUBLIC_KEY}&hash=${API_HASH_KEY}`;

export const charactersEndpoint = `/v1/public/characters?ts=1&apikey=${API_PUBLIC_KEY}&hash=${API_HASH_KEY}`;
export const comicsEndpoint = `/v1/public/comics?ts=1&apikey=${API_PUBLIC_KEY}&hash=${API_HASH_KEY}`;
export const seriesEndpoint = `/v1/public/series?ts=1&apikey=${API_PUBLIC_KEY}&hash=${API_HASH_KEY}`;
export const eventsEndpoint = `/v1/public/events?ts=1&apikey=${API_PUBLIC_KEY}&hash=${API_HASH_KEY}`;
