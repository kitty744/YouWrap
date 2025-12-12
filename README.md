# ![YouTube](https://img.shields.io/badge/YouTube-API-red) YouTube API Wrapper in TypeScript

[![TypeScript](https://img.shields.io/badge/TypeScript-4.9-blue)](https://www.typescriptlang.org/)
[![npm version](https://img.shields.io/npm/v/your-package-name)](https://www.npmjs.com/package/your-package-name)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A simple TypeScript wrapper for the YouTube Data API v3. Search videos, fetch video details, get channel info, and list playlist items. Fully typed for a better developer experience.

## Features

- Search for videos by keyword
- Fetch details of a single video
- Fetch multiple videos at once
- Get channel details
- List videos from a channel's playlist (uploads)
- Fully typed TypeScript interfaces

## Installation

Clone the repository:

```bash
git clone <your-repo-url>
cd <your-repo-folder>
```

Install dependencies:

```bash
npm install
```

Ensure TypeScript is installed globally:

```bash
npm install -g typescript ts-node
```

## Setup

You need a **YouTube API Key**. Go to [Google Cloud Console](https://console.cloud.google.com/), create a project, enable **YouTube Data API v3**, then go to **APIs & Services → Credentials → Create Credentials → API Key**.

Set your API key in `src/index.ts`:

```ts
const API_KEY = "YOUR_YOUTUBE_API_KEY";
```

## Usage

Run the test script:

```bash
ts-node src/index.ts
```

This script will:

- Search for videos
- Fetch details of the first video
- Fetch multiple video details
- Get channel details
- List the first 5 playlist items from the channel uploads

### Example Code

```ts
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
```

### Sample Output

```text
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
```

## Project Structure

```text
src/
  youtube.ts          # Main YouTube API wrapper
  types.ts            # TypeScript types for videos, channels, playlists
  index.ts            # Example script for testing the wrapper
package.json
tsconfig.json
README.md
```

## License

MIT License
