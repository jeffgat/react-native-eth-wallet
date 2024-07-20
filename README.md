- A description of how the app is structured and how the features are
implemented.

- Brief description of technical decisions you encountered while developing
the project

# concessions made
- added a bunch of things in `constants` folder that i probably wouldn't in prod. maybe let an api handle this or handle it internally more robustly.
  - images
  - token objects
- only added 2-4 erc20s per token, fetching every erc20 with a balance over 0 would require a pretty large token list and a source that gets updated
  - would also have to filter out the trash coins from the "real" ones, which i supposed could be down with a minimum market cap.

# React Native Oni Wallet


## Structure

`/components` are where components that are likely to be reused live.

`/constants` have also things that I might put in a `/config`, `/styles` or `/types` folder, but it holds mostly hardcoded files.

`/polyfills` - just one file in here to resolve an error that I was getting around btoa/atob not being defined. 

`/routes` for all things navigation related

`/screens` are where the screen components and where most of the logic specific to that screen live. In a larger app, I would prefer to make these into folders as the app size grows, and break up the logic and layouts into separate files.

`/services` just a single file to handle the logic around interacting with contracts via ethers.js

`/state` holds single file to manage global state as well as well as device storage

`/ui` some base styling components

`/utils` holds hooks and helper functions

## Features/Technical Decisions

All interactions with the blockchain were done via `ethers`. 