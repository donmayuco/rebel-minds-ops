---
name: Rebel Minds OPS
description: Editorial dark for operators — engineering-schematic proof, not agency gloss
colors:
  night-slate: "#0c131e"
  night-slate-deep: "#0a101a"
  panel-slate: "#141d2c"
  paper-white: "#e9edf4"
  harbor-gray: "#8fa0b3"
  quiet-gray: "#7d90a1"
  signal-cyan: "#7fd7e2"
  signal-cyan-pressed: "#5cc3ce"
  guardian-violet: "#b49df2"
  hairline: "#e9edf41a"
  placeholder-slate: "#5f6e85"
typography:
  display:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "clamp(3rem, 9vw, 5.9rem)"
    fontWeight: 500
    lineHeight: 0.99
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "1.875rem"
    fontWeight: 500
    lineHeight: 1.2
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "IBM Plex Mono, monospace"
    fontSize: "0.7rem"
    fontWeight: 400
    letterSpacing: "0.2em"
rounded:
  lg: "0.5rem"
  xl: "0.75rem"
  2xl: "1rem"
  full: "9999px"
spacing:
  section-y: "5rem"
  card-pad: "1.5rem"
  panel-pad: "2rem"
components:
  button-primary:
    backgroundColor: "{colors.signal-cyan}"
    textColor: "{colors.night-slate}"
    rounded: "{rounded.full}"
    padding: "0.875rem 1.75rem"
  button-primary-hover:
    backgroundColor: "{colors.signal-cyan-pressed}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.signal-cyan}"
    rounded: "{rounded.full}"
    padding: "0.75rem 1.5rem"
  card:
    backgroundColor: "{colors.panel-slate}"
    rounded: "{rounded.xl}"
    padding: "{spacing.card-pad}"
  input:
    backgroundColor: "{colors.night-slate}"
    textColor: "{colors.paper-white}"
    rounded: "{rounded.lg}"
    padding: "0.75rem 1rem"
---

# Design System: Rebel Minds OPS

## 1. Overview

**Creative North Star: "Evening Kin"**

Evening Kin is editorial dark, not dashboard dark: the confidence of a systems firm that draws its own schematics, set after hours. The page reads like a well-set technical journal — serif headlines with real presence, mono labels that behave like margin notes, hairline-divided panels instead of floating cards, and one signature artifact (the animated Wiring Diagram) doing the proving that adjectives never could. Density is calm; nothing glows, nothing floats, nothing counts up.

The system explicitly rejects PRODUCT.md's anti-references: the generic AI-automation-agency look ("dark theme + glowing gradients + 'we build AI agents' sameness"), the faceless SaaS platform, and hype-bro automation marketing. Cyan-on-dark is kept deliberately as brand equity, but it is wired, not glowing: it appears as thin strokes, small labels, and one solid CTA, never as gradient washes or neon shadows. The site must be visually recognizable as kin to rebelminds.ai (same Newsreader + Inter + IBM Plex Mono family) while staying the builder voice, not the scientist voice.

**Key Characteristics:**
- Serif display type carries the personality; sans body carries the information; mono carries the labels.
- Hairline grids (`gap-px` on a hairline background) instead of floating card grids.
- One accent used as signal, one violet reserved for the compliance layer.
- Proof artifacts (diagrams, ledgers, named case studies) over decoration.
- Sentence case everywhere except mono labels.

## 2. Colors

A blue-slate night ramp with a single cyan signal and a violet reserved for protection semantics.

### Primary
- **Signal Cyan** (#7fd7e2): the one working accent. CTA fills, kicker labels, live wires and packet pulses in the diagrams, focus borders, inline link underlines. Pressed/hover state darkens to **#5cc3ce**. It is a signal, never a wash: no gradients, no glows, no large cyan surfaces.

### Secondary
- **Guardian Violet** (#b49df2): the compliance layer, used only where protection is the message (the BAA boundary, padlock, and inside-node blooms of the healthcare Compliance Diagram). Cyan is the message in motion; violet is the protection around it. Do not use violet as a general second accent.

### Neutral
- **Night Slate** (#0c131e): page background.
- **Night Slate Deep** (#0a101a): alternating section background; the only sanctioned way to band sections.
- **Panel Slate** (#141d2c): card and panel surfaces.
- **Paper White** (#e9edf4): primary text and serif headlines. Never pure #fff.
- **Harbor Gray** (#8fa0b3): secondary text, body copy on dark.
- **Quiet Gray** (#7d90a1): fine print and captions. This is the floor: it measures 5.1:1 on Panel Slate. The old #6f858c failed WCAG AA and is retired.
- **Hairline** (rgba(233,237,244,0.10)): every border, divider, and grid line.

### Named Rules
**The Two-Light Rule.** Cyan is motion and action; violet is protection. No third accent exists. If a new element needs color, it takes cyan or it takes gray.

**The Contrast Floor Rule.** No text on any dark surface may fall below #7d90a1. If it needs to be quieter than that, it should be smaller or absent, not dimmer.

## 3. Typography

**Display Font:** Newsreader (Georgia fallback) — applied via the `.serif` utility.
**Body Font:** Inter (system-ui fallback).
**Label/Mono Font:** IBM Plex Mono — applied via the `.mono` utility.

**Character:** A literary serif over an engineer's grid. Newsreader at medium weight (never bold) gives headlines editorial authority; Plex Mono in tracked uppercase makes every label read like a schematic annotation.

### Hierarchy
- **Display** (500, clamp(3rem, 9vw, 5.9rem), 0.99): homepage hero only. Tight negative tracking (-0.02em), with the italic em in Signal Cyan as the one flourish.
- **Headline** (500, 1.875rem → 2.25rem at sm, snug): section h2s, always `.serif`, always sentence case. `font-bold` on headlines is prohibited.
- **Title** (600, 1rem–1.125rem, tight): card and row headings, Inter semibold.
- **Body** (400, 0.875rem–1.05rem, relaxed): Inter, Harbor Gray, max width 46–65ch. Long lines are a defect.
- **Label** (400, 0.7rem, tracking 0.16em–0.2em, UPPERCASE): Plex Mono kickers, captions, diagram annotations. 0.7rem is the floor; nothing renders smaller.

### Named Rules
**The Kicker Rule.** Sections are labeled by a mono uppercase kicker in Signal Cyan sitting above a serif headline. Never a pill, never a badge, never a bordered chip.

**The Sentence Case Rule.** Headlines and CTAs are sentence case. Title Case is a template tell. Mono labels are the only uppercase.

## 4. Elevation

Flat. Depth is conveyed by the three-step slate ramp (Night Slate → Night Slate Deep → Panel Slate) and hairline borders, never by shadows. Hover states change border color or background tint, not elevation: cards may shift their border toward `rgba(127,215,226,0.3)`, buttons change opacity or fill. Glow shadows (`box-shadow` in cyan), hover lifts (`hover:-translate-y-*`), and gradient top-bars are prohibited — they were removed in the 2026-07 conversion and must not return.

### Named Rules
**The No-Glow Rule.** If an element casts colored light, it's wrong. The only blur on the site is the SVG bloom filter inside the diagrams, where a node "receiving data" flares for under a second.

## 5. Components

### Buttons
- **Shape:** fully rounded (9999px) for marketing CTAs; softly rounded (0.5rem) for in-flow/form-adjacent actions on subpages.
- **Primary:** Signal Cyan fill, Night Slate text, semibold, `px-7 py-3.5`. Hover: darken to #5cc3ce or drop to 90% opacity. Never scale on hover.
- **Ghost:** transparent with cyan text; either a cyan 30% border (pill) or a hairline border (secondary). Hover: faint cyan tint background.

### Cards / Containers
- **Corner Style:** 0.75rem (rounded-xl); large feature panels may use 1rem.
- **Background:** Panel Slate on hairline borders.
- **Shadow Strategy:** none (see Elevation).
- **The Hairline Grid:** collections render as one bordered container with `gap-px` and a hairline background showing through — a ruled ledger, not floating tiles. Icons sit inline beside the heading (h-4.5, cyan), never in a rounded icon tile above it.

### Inputs / Fields
- **Style:** Night Slate background, hairline border, 0.5rem radius, `px-4 py-3`, placeholder in #5f6e85.
- **Focus:** border shifts to `rgba(127,215,226,0.5)`. No ring, no glow.
- **Error:** red-400 text on a faint red tinted panel.

### Navigation
- Sticky, Night Slate, hairline bottom border, 80px tall. Brand lockup: icon + "Rebel Minds OPS" with cyan OPS + tagline. Links in Harbor Gray, current page marked via `aria-current` and Paper White.

### The Wiring Diagram (signature)
An animated SVG engineering schematic of a real client system: hairline node boxes labeled in Inter with mono annotations, cyan wires that draw in, packet pulses that travel them, and node blooms on arrival. Dim catalog wires exit the frame (open-set semantics). Reduced motion serves the fully-drawn static diagram. On healthcare, the Compliance Diagram variant adds the violet protection layer. Diagrams carry `min-width: 760px` inside a scrollable container so labels stay legible on phones. This component family is the brand's proof-of-work; treat changes as brand decisions.

## 6. Do's and Don'ts

### Do:
- **Do** label sections with mono uppercase kickers (0.7rem, tracked, Signal Cyan) above serif sentence-case headlines.
- **Do** use hairline grids (`gap-px` + rgba(233,237,244,0.10)) for any collection of parallel items, with icons inline beside headings.
- **Do** keep every claim defensible: named clients only with permission, no invented stats, qualitative phrasing ("the large majority of breaches") over uncited precision.
- **Do** keep bilingual as a capability line in the owner's-problem voice, one placement per surface.
- **Do** hold the contrast floor: #7d90a1 minimum for text, 0.7rem minimum for labels.

### Don't:
- **Don't** ship "dark theme + glowing gradients + 'we build AI agents' sameness" — PRODUCT.md's own anti-reference. No cyan box-shadows, no gradient text, no glassmorphism, no count-up numbers, no marquees, no typewriter effects.
- **Don't** use pill badges, icon tiles above headings, identical card grids, or hero-metric stat tiles. These are the template tells the 2026-07 conversion removed.
- **Don't** use em dashes in copy. Commas, colons, periods, parentheses.
- **Don't** write Title Case headlines or "your neighborhood IT guy" local-vendor copy ("We're your neighbors" is banned verbatim).
- **Don't** use `font-bold` on serif headlines, borders thicker than 1px as colored accents, or any text dimmer than Quiet Gray.
- **Don't** add a third accent color. Cyan acts, violet protects, everything else is slate and gray.
