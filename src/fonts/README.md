# Fonts

The site's three typefaces, kept in the repository so a build never depends on
downloading them. They are loaded in `src/app/fonts.ts`.

| Family | Files | Used for |
| :--- | :--- | :--- |
| Outfit | Latin, 400 / 500 / 600 | Body text |
| Barlow Condensed | Latin, 700 / 800, upright and italic | Headings and buttons |
| Cairo | Arabic, 400 / 600 / 700 | Arabic text |

Each is licensed under the SIL Open Font License 1.1; the licence for each
family is beside the files. The files come from the Fontsource packages
(`@fontsource/outfit`, `@fontsource/barlow-condensed`, `@fontsource/cairo`,
version 5.3.0), which repackage the Google Fonts releases. To add a weight or
a subset, copy the matching `.woff2` from that package and list it in
`src/app/fonts.ts`.
