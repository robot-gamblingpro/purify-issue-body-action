# purify-issue-body-action

Github action that will parse issue body and comments and strip inline urls

## Usage

Usage to parse the message example above:

```yml
name: Check issues

on:
  issues:
    types:
      - "opened"
      - "edited"
      - "reopened"

jobs:
  exec:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2

      - uses: robot-gamblingpro/purify-issue-body-action
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```
