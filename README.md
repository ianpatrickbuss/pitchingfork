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

### Componentsmy favorite stack overflow question is the one i asked that is incredio select from

**ScoreCard:**

- This will show the results from the quizz w/ a tally &amp; percentage breakdown of both the base range questions and sub range (bonus) if attempted.
- Each incorrect answer will allow the user to hear the sound again.

### Change Log

- 11/11/2020: Fixed a bug w/ the radar graph that would result in incorrect labels. Categorized answers based off accuracy. Added responsive layout that enlarges reset button, makes a three column grid, adjusts the header image on screen size. Added scaffolding for CSV download. Added transitions to buttons, hover states. Fixed bundle size issue with Tailwind.
- 11/9/2020: Added a progress bar w/ tweening. Fixed a math error that would produce the wrong boundings of sub ranges. Added a x/y in the graph label. Added github, svelte, and tailwind svg logos. Adjusted the text on the landing page. Adjusted spacing of footer.
- 11/9/2020: Reimplemented Tailwind build process in rollup, Added a Radar chart from [chart.js](https://www.chartjs.org/) to Scorecard. Refactored the libraries slightly. Added github icon to bottom of Quiz. Added a mockdata library. Restructured components into related directories.
- 11/7/2020: Released Working Draft: Simple Quiz no fancy buttons or whatnot.
