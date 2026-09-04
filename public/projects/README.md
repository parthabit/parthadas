# Project images go here

Create a folder per project matching its `id` in `src/data/projects.js`, for example:

```
public/projects/
  financial-decision-bot/
    cover.png
    screenshot-1.png
    screenshot-2.png
```

Then reference them in the project's data entry:

```js
image: "/projects/financial-decision-bot/cover.png",
screenshots: [
  "/projects/financial-decision-bot/screenshot-1.png",
  "/projects/financial-decision-bot/screenshot-2.png",
],
```

If you don't add an `image`, the project card automatically shows a
clean placeholder — nothing breaks.
