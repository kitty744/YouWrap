
import axios from "axios"
import type { AxiosInstance } from "axios";

import type { SearchResponse, Video, VideoListResponse } from "./types";

export class YouTubeAPI {
    private apiKey: string;
    private http: AxiosInstance;
    private baseUrl = "https://www.googleapis.com/youtube/v3";

    constructor(apiKey: string) {
        if (!apiKey) {
            throw new Error("YouTube API key is required");
        }

        this.apiKey = apiKey;

        this.http = axios.create({
            baseURL: this.baseUrl,
            timeout: 8000
        })
    }

    private async request<T>(endpoint: string, params: Record<string, any>): Promise<T> {
        const fullParams = {
            key: this.apiKey,
            ...params
        };

        try {
            const res = await this.http.get(endpoint, {
                params: fullParams
            });

            return res.data as T;
        } catch (err: any) {
            console.error("YouTube API error:", err.message);

            throw err;
        }
    }

    public async search(query: string, maxResults: number = 10): Promise<SearchResponse> {
        const params = {
            part: "snippet",
            q: query,
            maxResults: maxResults,
            type: "video"
        };

        const data = await this.request<SearchResponse>("/search", params);
        return data;
    }

    public async getVideo(id: string): Promise<Video> {
        if (!id || id.trim() === "") {
            throw new Error("getVideo() requires a non-empty video ID");
        }

        const params = {
            part: "snippet,statistics,contentDetails",
            id: id
        };

        const data = await this.request<VideoListResponse>("/videos", params);

        return data.items[0]
    }

    public async getVideos(ids: string[]): Promise<Video[]> {
        if (!ids || ids.length === 0 || ids.some(id => !id || id.trim() === "")) {
            throw new Error("getVideos() requires a non-empty video IDs");
        }

        const params = {
            part: "snippet,statistics,contentDetails",
            id: ids.join(",")
        };

        const data = await this.request<VideoListResponse>("/videos", params);

        return data.items
    }

    public async getChannel(id: string): Promise<any> {
        if (!id || id.trim() === "") {
            throw new Error("getChannel() requires a non-empty channel ID");
        }

        const params = {
            part: "snippet,statistics,contentDetails",
            id: id
        };

        const data = await this.request< { items: any[] } >("/channels", params);

        return data.items[0];
    }

    public async listPlaylistItems(playlistId: string, maxResults: number = 10): Promise<any[]> {
        if (!playlistId || playlistId.trim() === "") {
            throw new Error("listPlaylistItems() requires a non-empty playlist ID");
        }

        const params = {
            part: "snippet,contentDetails",
            playlistId: playlistId,
            maxResults: maxResults
        };

        const data = await this.request< { items: any[] } >("/playlistItems", params);

        return data.items;
    }
}