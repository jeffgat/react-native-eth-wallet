# todos
- convert 12 word seed phrase to private key
- add ability to send money
- encrypt private key with expo-crypto in secure store
- set necessary environment variables
- add some basic unit tests
- user feedback with toasts, errors and successes
- all error and loading views
- check out services/ethereum for some refactoring
- add all your missing types where important
- switch hardcoded tokens to alchemy api
- brand with one of your dribbble icons

- maybe a transaction history?

# concessions made
- added a bunch of things in `constants` folder that i probably wouldn't in prod. maybe let an api handle this or handle it internally more robustly.
  - images
  - token objects
- only added 2-4 erc20s per token, fetching every erc20 with a balance over 0 would require a pretty large token list and a source that gets updated
  - would also have to filter out the trash coins from the "real" ones, which i supposed could be down with a minimum market cap.