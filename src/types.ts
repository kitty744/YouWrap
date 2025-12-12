export interface SearchResultItem {
    id: {
        kind: string;
        videoId?: string;
    };
    snippet: {
        title: string;
        description: string;
        channelTitle: string;
    };
}

export interface SearchResponse {
    items: SearchResultItem[];
}

export interface Video {
    id: string;
    snippet: {
        title: string;
        description: string;
        channelTitle: string;
    };
    statistics: {
        viewCount: string;
        likeCount?: string;
    };
    contentDetails: {
        duration: string;
    };
}

export interface VideoListResponse {
    items: Video[];
}

export interface Channel {
    id: string;
    snippet: {
        title: string;
        description: string;
    };
    statistics: {
        subscriberCount: string;
        viewCount: string;
        videoCount: string;
    };
    contentDetails: {
        relatedPlaylists: {
            uploads: string;
        };
    };
}

export interface ChannelListResponse {
    items: Channel[];
}

export interface PlaylistItem {
    id: string;
    snippet: {
        title: string;
        description: string;
        resourceId: {
            videoId: string;
        };
    };
    contentDetails: {
        videoId: string;
        videoPublishedAt: string;
    };
}

export interface PlaylistItemsResponse {
    items: PlaylistItem[];
}