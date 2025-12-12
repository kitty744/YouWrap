# YouTube API Wrapper (TypeScript)

A lightweight, beginner-friendly YouTube Data API v3 wrapper written in TypeScript. This project is designed as a learning experience for mastering:

* TypeScript classes & interfaces
* API calls with Axios
* Async/await patterns
* Clean project structure
* Building your own reusable SDK

## Features

* Fetch YouTube video details
* Search for videos
* Fetch channel information
* Strongly typed responses
* Easy-to-use client: `new YouTubeClient(apiKey)`

## Project Structure

```text
src/
 ├── youtube.ts      # Main wrapper class
 ├── types.ts        # Shared TypeScript interfaces
 └── index.ts        # Example usage / entry point
```

## Requirements

* Node.js 18+
* YouTube Data API v3 Key
* npm

## Setup

```bash
npm install
npm install axios
npm install --save-dev typescript ts-node @types/node
npx tsc --init
```

## Running

Use ts-node to run your entry file:

```bash
npx ts-node src/index.ts
```

## Environment Variables

Create a `.env` file:

```
YT_API_KEY=your_api_key_here
```

## License

MIT
