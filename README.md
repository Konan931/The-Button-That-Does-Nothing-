# The Button That Does Nothing

A futuristic anti-game button that claims to do nothing, but slowly becomes more unstable with every click.

## Features

- Futuristic animated button UI
- Click-based event progression
- Chaos levels in the HUD
- Persistent click counter with `localStorage`
- Achievement toasts
- Confetti, emoji rain, fake errors and glitch effects
- Fake terminal sequence
- Konami-code Easter egg
- Reset button for local progress
- Ending page after 100 clicks

## Project Structure

```txt
.
├── index.html
├── style.css
├── effects.js
├── nothing.html
├── docs/
│   └── roadmap.md
└── README.md
```

## Local Development

Start a tiny local server from the repository root:

```bash
python3 -m http.server 8000
```

Then open:

```txt
http://localhost:8000
```

## Branch Workflow

```bash
git checkout main
git pull
git checkout -b feature/effect-registry
```

After testing:

```bash
git add .
git commit -m "refactor: modularize button effects"
git push -u origin feature/effect-registry
```

## Roadmap

See [`docs/roadmap.md`](docs/roadmap.md).

## License

MIT or another project license can be added later.
