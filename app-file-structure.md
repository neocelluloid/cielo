src/
├── routes/
│   ├── +layout.svelte            ← shell, sidebar, slot
│   ├── +page.ts                  ← redirects to /feed/whats-hot
│   └── feed/
│       └── [uri]/
│           ├── +page.server.ts   ← fetches posts, credentials here
│           └── +page.svelte      ← renders posts, no logic
│
└── lib/
    ├── api/
    │   └── bluesky.js            ← BskyAgent, ensureSession, getFeed
    ├── components/
    │   ├── layout/
    │   │   └── Sidebar.svelte
    │   └── feed/
    │       └── PostCard.svelte
    └── .env                      ← BSKY_HANDLE, BSKY_APP_PASSWORD