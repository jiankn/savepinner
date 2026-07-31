# pinterest-url-normalizer

Parse, classify, and normalize Pinterest URLs without making network requests.

The package recognizes Pin, `pin.it`, profile, board, and Ideas URLs across Pinterest country domains. It uses an exact host allow list, rejects HTTP URLs and lookalike domains, and removes tracking parameters from normalized output.

## Install

```bash
npm install pinterest-url-normalizer
```

## Usage

```js
import {
  isPinterestUrl,
  normalizePinterestUrl,
  parsePinterestUrl,
} from "pinterest-url-normalizer";

const parsed = parsePinterestUrl(
  "https://de.pinterest.com/pin/987654321/?utm_source=share",
);

console.log(parsed.kind); // "pin"
console.log(parsed.pinId); // "987654321"
console.log(parsed.normalizedUrl);
// https://www.pinterest.com/pin/987654321/

isPinterestUrl("https://pin.it/AbC123"); // true
normalizePinterestUrl("https://pinterest.co.uk/savepinner/media-tools/");
// https://www.pinterest.com/savepinner/media-tools/
```

## Supported URL kinds

| Kind | Example |
| --- | --- |
| `pin` | `https://www.pinterest.com/pin/123456789/` |
| `short` | `https://pin.it/AbC123` |
| `profile` | `https://www.pinterest.com/savepinner/` |
| `board` | `https://www.pinterest.com/savepinner/media-tools/` |
| `ideas` | `https://www.pinterest.com/ideas/space-wallpaper/926295399832/` |

`pin.it` links are classified and normalized but are not followed. Resolving them requires a network request and belongs in the consuming application.

## API

### `parsePinterestUrl(input)`

Returns a discriminated object with `kind`, `originalUrl`, `normalizedUrl`, and type-specific fields. Throws `PinterestUrlError` with code `INVALID_URL` or `UNSUPPORTED_URL` when parsing fails.

### `normalizePinterestUrl(input)`

Returns the canonical URL. Full Pinterest URLs use `www.pinterest.com`; short links retain `pin.it` because resolving them requires network access.

### `isPinterestUrl(input)`

Returns `true` when the value is one of the supported URL forms.

### `isPinterestHost(host)`

Checks a hostname against the package's exact Pinterest country-domain allow list.

## Why this package exists

This parser is maintained by the team behind [SavePinner](https://savepinner.com/pinterest-downloader/), a browser tool for inspecting media exposed by public Pinterest Pin URLs. The package contains no downloader, tracking, browser automation, or remote code.

Pinterest is a trademark of Pinterest, Inc. This project is independent and is not affiliated with or endorsed by Pinterest.

## License

MIT
