# YouTube API Wrapper in TypeScript

A simple TypeScript wrapper for the YouTube Data API v3. It allows you to search videos, fetch video details, get channel information, and list playlist items. Fully typed with TypeScript for better developer experience.

## Features

- Search for videos by keyword
- Fetch details of a single video
- Fetch multiple videos at once
- Get channel details
- List videos from a channel's playlist (uploads)
- TypeScript types for videos, channels, and playlists

## Installation

1. Clone the repository:

\`\`\`bash
git clone <your-repo-url>
cd <your-repo-folder>
\`\`\`

2. Install dependencies:

\`\`\`bash
npm install
\`\`\`

3. Ensure TypeScript is installed:

\`\`\`bash
npm install -g typescript ts-node
\`\`\`

## Setup

You need a **YouTube API Key**. Go to [Google Cloud Console](https://console.cloud.google.com/), create a project, enable **YouTube Data API v3**, then go to **APIs & Services → Credentials → Create Credentials → API Key**. Copy the key.

Set your API key in \`src/index.ts\`:

\`\`\`ts
const API_KEY = "YOUR_YOUTUBE_API_KEY";
\`\`\`

## Usage

Run the test script:

\`\`\`bash
ts-node src/index.ts
\`\`\`

This script will:

- Search for videos
- Fetch details of the first video
- Fetch multiple video details
- Get channel details
- List the first 5 playlist items from the channel uploads

### Example Code

\`\`\`ts
import { YouTubeAPI } from "./youtube";
import type { SearchResponse, Video, Channel, PlaylistItem } from "./types";

const yt = new YouTubeAPI("YOUR_YOUTUBE_API_KEY");

const searchResults: SearchResponse = await yt.search("TypeScript tutorials", 3);

const firstVideo: Video = await yt.getVideo(searchResults.items[0].id.videoId!);

const videos: Video[] = await yt.getVideos(
    searchResults.items.map(item => item.id.videoId!).filter(id => id !== undefined)
);

const channel: Channel = await yt.getChannel(searchResults.items[0].snippet.channelTitle);

const playlistItems: PlaylistItem[] = await yt.listPlaylistItems(channel.contentDetails.relatedPlaylists.uploads, 5);
\`\`\`

### Sample Output

\`\`\`
Search results:
1. TypeScript Tutorial 1 (abc123)
2. TypeScript Tutorial 2 (def456)
3. TypeScript Tutorial 3 (ghi789)

First video details:
{ id: 'abc123', snippet: { ... }, statistics: { ... }, contentDetails: { ... } }

Multiple videos details:
[ {...}, {...}, {...} ]

Channel details:
{ id: 'channel123', snippet: { ... }, statistics: { ... }, contentDetails: { ... } }

First 5 playlist items:
[ {...}, {...}, {...}, {...}, {...} ]
\`\`\`

## Project Structure

\`\`\`
src/
  youtube.ts          # Main YouTube API wrapper
  types.ts            # TypeScript types for videos, channels, playlists
  index.ts            # Example script for testing the wrapper
package.json
tsconfig.json
README.md
\`\`\`

## License

MIT License
