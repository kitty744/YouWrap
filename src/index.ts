// src/index.ts

import { YouTubeAPI } from "./youtube";
import type { SearchResponse, Video, Channel, PlaylistItem } from "./types";

// Replace with your real YouTube API key
const API_KEY = "YOUR_YOUTUBE_API_KEY";

async function main() {
    const yt = new YouTubeAPI(API_KEY);

    try {
        // Search for videos
        const searchResults: SearchResponse = await yt.search("TypeScript tutorials", 3);
        console.log("Search results:");
        searchResults.items.forEach((item, i) => {
            console.log(`${i + 1}. ${item.snippet.title} (${item.id.videoId})`);
        });

        // Get the first video details
        if (searchResults.items.length > 0) {
            const firstVideoId = searchResults.items[0].id.videoId!;
            const video: Video = await yt.getVideo(firstVideoId);
            console.log("\nFirst video details:");
            console.log(video);
        }

        // Get multiple videos
        const videoIds = searchResults.items
            .map(item => item.id.videoId)
            .filter((id): id is string => id !== undefined);

        if (videoIds.length > 0) {
            const videos: Video[] = await yt.getVideos(videoIds);
            console.log("\nMultiple videos details:");
            console.log(videos);
        }

        // Get channel details of first video
        if (searchResults.items.length > 0) {
            const channelId = searchResults.items[0].snippet.channelTitle;
            const channel: Channel = await yt.getChannel(channelId);
            console.log("\nChannel details:");
            console.log(channel);

            // List the first few playlist items of the channel's uploads
            const uploadsPlaylistId = channel.contentDetails.relatedPlaylists.uploads;
            const playlistItems: PlaylistItem[] = await yt.listPlaylistItems(uploadsPlaylistId, 5);
            console.log("\nFirst 5 playlist items:");
            console.log(playlistItems);
        }

    } catch (err) {
        console.error("Error testing YouTube API:", err);
    }
}

main();
