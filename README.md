# Pitchfork

A small game designed to hone one's ability to hear tones.

## Goals

- Generate tones using [Web Audio API in JavaScript](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API).
- Implement a score feature

## Functionality

- [Sound is broken into audible spectrum between 20Hz and 20,000Hz.](https://en.wikipedia.org/wiki/Audio_frequency) A majority of sound is heard between 50Hz-6000Hz.
- The user is tested on varying tones from a range of bands spanning between 20Hz and 20,000Hz.
- The user will select what band they believe the sound falls in based off of a selection of ranges.
- The user can also select, for a bonus point, a sub range that the frequency may fall within.

### Components

**Quiz:**

- Provide either a specific frequency to select from
- Provide a band of frequencies to select from

**ScoreCard:**

- This will show the results from the quizz w/ a tally &amp; percentage breakdown of both the base range questions and sub range (bonus) if attempted.
- Each incorrect answer will allow the user to hear the sound again.
