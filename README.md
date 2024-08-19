# movie-search

I used Vue + Vite for my implementation along with Apollo for working with graphql. Some things that I think are interesting.

- I used Apollo's codegen to make TypeScript types from the schema.
- I worked a bit on light/dark mode.
- I used Open Props for styling and some icons from something called Element Plus
- Everything should be mobile friendly and work well on desktop as well.
- I'm particularly proud of the star rating component I made which I think makes it more interesting.
- Also I like the sticky top bar and pagination at the bottom.
- Note: The API was not giving me the total results, only the total pages, so I just have next and previous rather than a full pagination.

Given more time here are some things I'd like to improve or change.

- Lint with ESlint to catch things like using `let` where it could be `const`
- Clean up some of the TypeScript. I was just adding some things at the end to eliminate errors and given a bit more time it could be cleaner.
- Add tests
- Move the genre filters into a dropdown in the sticky top bar.
- Have the ability to open a poster in a light box type modal
- Handle errors in an ErrorBoundary type setup.
- In general I think the handling of the token should be revisited. It works, but if the token was coming from OAuth for instance, how I did it wouldn't make sense.
- Move some of the computed value things in the card into util functions.
- Make a better placeholder for when there isn't a poster.
- Try to get the bundle size down
- And last but not least, look at accessibility. I did the bare minimum, but there are probably established patterns, for say pagination, that I could be using.
- Have the API endpoint be an env var.
- Use a Vite hook to dynamically change the hard-coded `href` in the `rel="preconnect"`.
