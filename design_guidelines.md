# MED13 Foundation Design Guidelines

## Design Philosophy: Family-First Modernity

The MED13 Foundation's design centers on **families, connection, and shared hope** rather than clinical institutions. The visual language should feel **warm, uplifting, and trustworthy** - communicating that this is a place built by and for families navigating MED13 syndrome together.

**Design Tone Keywords:**
💞 *Warm • Inclusive • Trustworthy • Hopeful • Connected • Human-Centered*

## Color System - "Warm Science + Family Hope"

The palette evokes optimism, empathy, and clarity - balancing medical trust with human warmth.

**Primary Palette:**
- **Soft Teal** `#68B0AB` (HSL: 176 31% 55%) - Calming, trustworthy, representing health and growth
- **Coral-Peach** `#FFB6A0` (HSL: 12 100% 81%) - Warmth, compassion, family focus
- **Sunlight Yellow** `#FFD166` (HSL: 43 100% 70%) - Hope, optimism, possibility

**Supporting Colors:**
- **Background** `#FAFAFA` (HSL: 0 0% 98%) - Clean, breathable canvas with subtle warmth
- **Text** `#2E2E2E` (HSL: 0 0% 18%) - Readable, modern contrast
- **Muted** Soft neutral grays for secondary information

**Color Usage:**
- Avoid harsh medical blues or greys
- Use gentle gradients like teal → coral to suggest collaboration between science and love
- Primary buttons and CTAs use the warm teal as the fill, with night-sky navy `#0B1530` text (white on teal fails contrast)
- Secondary highlights use coral-peach for emotional warmth, as a fill or accent, never as text
- Text that would be teal or coral uses navy instead: in light mode, `text-primary` and `text-secondary` render navy
- Text colors come from tokens, never hex: navy `--primary-text` / `--secondary-text` (`text-primary`, `text-secondary`), warm brown `--warm-text` `#A25947` for small accent labels (`text-warm`, also `bg-warm` with white text), rust `--destructive-text` for errors (`text-destructive`), and `--muted-foreground` (40% grey) for secondary text
- Dark-mode tokens exist but aren't audited for contrast; the site doesn't use dark mode
- Accent yellow for hope and optimism touches, as a fill or decoration only. Never use it for text, icons or borders on white or `#FAFAFA` (1.38-1.44:1). Navy or `#2E2E2E` text on yellow is fine *(WCAG 1.4.3, 1.4.11)*
- Warm brown `text-warm` goes on white, `#FAFAFA`, `--muted`, `--accent` and the 10% teal tint (`bg-primary/10`) only. On a heavier teal tint it drops below 4.5:1 (4.17-4.32:1 on 20%); use navy or `#2E2E2E` there *(1.4.3)*
- Destructive buttons and badges (`bg-destructive`) take navy text (6.38:1). White on that fill is 2.80:1 *(1.4.3)*
- Teal, coral and yellow never carry meaning on their own as an icon, line, border or chart mark on a light background (2.50:1, 1.74:1 and 1.44:1 on white). A meaningful icon is navy or `#2E2E2E`, or a navy glyph on a filled teal, coral or yellow chip. Decorative icons get `aria-hidden` *(1.4.11, 1.4.1)*
- Colour never carries meaning alone. Status, phase, required fields, errors and the active nav item also get a word, an icon shape or a pattern *(1.4.1)*
- Check a gradient behind text at both ends and the midpoint. Navy passes along the whole teal → coral gradient (7.15-10.24:1) *(1.4.3)*

**Links:**
- Links inside body text are underlined at all times. Navy links are 1.32:1 against `#2E2E2E` body text, so colour alone can't tell them apart. Navigation menus, buttons and cards that are obviously links can drop the underline, but show one on hover and focus *(1.4.1)*
- Hover, focus and visited link states keep at least 4.5:1 against their background *(1.4.3)*

**Borders and Focus:**
- Form field borders (`--input`, `0 0% 46%`, about `#757575`) are at least 3:1 against the field and the page: 4.61:1 on white, 4.41:1 on `#FAFAFA`. The old 72% grey was 1.90-1.98:1. Card and divider borders (`--border`) are decorative and can stay light, as long as nothing depends on them to be understood *(1.4.11)*
- Focus indicator: a 2px navy outline (`--ring`, `224 63% 12%`, the same navy as the text tokens) with a 2px white offset, on every interactive element. Navy is 17.9:1 on white and 7.15:1 on teal. Teal fails as a focus colour: 2.50:1 on white, and 1:1 next to a teal button. Never remove the outline without a replacement *(2.4.7, 1.4.11)*
- A focused element is never fully hidden behind the sticky header, the cookie banner or a chat widget. Set `scroll-padding-top` to the header height *(2.4.11)*

## Typography - "Readable, Modern, Gentle"

Communicate clarity and care at first glance with humanistic, approachable type.

**Font Families:**
- **Headings**: Nunito Sans - Rounded, humanistic, family-friendly, easy to read for all ages
- **Body**: Inter - Professional yet friendly, excellent legibility
- **Highlights/Quotes**: Playfair Display - Elegant, adds emotional warmth

**Type Scale:**
- Hero Headline: Nunito Sans 48-60px, font-weight 700-800
- Section Heading: Nunito Sans 32-40px, font-weight 600-700
- Subsection: Nunito Sans 20-24px, font-weight 600
- Body Large: Inter 18-20px, font-weight 400, line-height 1.7
- Body Standard: Inter 16px, font-weight 400, line-height 1.7
- Captions: Inter 14px, font-weight 400

**Line Height:** 1.6-1.8 for comfort and accessibility

## Hero Section - "Families and Discovery Together"

**Goal:** Make the mission statement *felt* before it's read.

**Design Approach:**
- Background: Medical research/DNA imagery under a teal-to-coral gradient overlay of at least 85% opacity. Navy text on it stays at 5.27:1 or better even over a black area of the photo. Don't go below 85%, and don't put white text on it *(1.4.3)*
- Text: Navy text over the light gradient ensures readability (white fails contrast here)
- Visual metaphor: Subtle scientific elements (DNA strands, molecular patterns) suggest research without being clinical
- Call-to-action buttons:
  - Primary: White background with navy text - high contrast, approachable
  - Secondary: Semi-transparent with navy text and backdrop blur - modern, elegant

**Layout:**
- Full-width hero with thematic background image
- Centered content with mission statement
- Two prominent CTAs: "Join Research Cohort" and "Learn Our Story"
- Trust indicators: Badge elements showing family count and foundation stage

## Imagery Strategy - "Human Faces, Gentle Science"

**Goal:** Reinforce family connection and inclusivity.

**Approach:**
- Use thematically relevant background images:
  - **Hero section**: Medical research/DNA theme with the teal-to-coral overlay and navy text
  - **Get Involved section**: Community/connection theme with light overlay for warmth
- When possible, include authentic family photos (diverse, natural lighting, candid moments)
- Research context in soft focus to avoid sterility
- Overlay subtle geometric shapes suggesting molecular structure + human connection

**Image Specifications:**
- Natural lighting, warm tones
- Avoid stock photo stiffness or overly clinical imagery
- Use overlays of at least 85% opacity under navy or `#2E2E2E` text. Secondary text (`--muted-foreground`) needs a white, `#FAFAFA` or `--accent` overlay of at least 92%, or a `--muted` overlay of at least 93%. Warm brown `text-warm` doesn't sit on a photo overlay at all; put it on a solid surface or a white `bg-card/95` card *(1.4.3)*
- Cards can have semi-transparent backgrounds (95% opacity) with backdrop blur

**Alt Text and Captions:**
- Describe what matters in the photo for this page ("Three siblings laughing on a porch swing"), not "family photo". Use `alt=""` for decorative backgrounds, DNA patterns and molecular shapes *(1.1.1)*
- Get the family's consent for each photo and caption
- Never put words inside images; set them as live text *(1.4.5)*
- Translate alt text and captions with the page in Spanish *(1.1.1, 3.1.2)*

## Layout & Structure

**Goal:** Balance storytelling with action, create calm rhythm.

**Key Principles:**
- Maximum section width: 1100-1200px for optimal readability
- Generous padding: 80-100px between sections (py-16 to py-24)
- Use asymmetric grid sections where appropriate (alternating photo/text)
- Soft dividers: Faint gradient lines or curved section breaks
- Replace dense lists with icon cards (rounded corners, pastel backgrounds)
- Keep body text to a readable line length inside the wide container, well under 80 characters per line *(supports 1.4.8)*
- Layouts reflow to a single column at 320px wide with no sideways scrolling, and hold up at 200% browser zoom without clipped or overlapping text. Set type in `rem`, and don't fix the height of anything that holds text *(1.4.4, 1.4.10)*
- Text keeps working when people raise line height to 1.5, paragraph spacing to 2×, letter spacing to 0.12em and word spacing to 0.16em, so buttons, badges and cards don't get fixed heights *(1.4.12)*
- The header, navigation, footer, and the place where contact and help links sit stay in the same order on every page *(3.2.3, 3.2.6)*

**Cards & Components:**
- Clean white cards with subtle elevation
- 6-8px border radius for gentle, approachable feel
- Semi-transparent cards (bg-card/95) with backdrop blur over background images, holding navy or `#2E2E2E` text. Muted and warm text on these cards passes over any photo (5.13:1 and 4.56:1 at worst), but nothing more transparent than 95% carries secondary text *(1.4.3)*
- Icon + Title + Description pattern
- Every click or tap target is at least 24×24px, or has 24px of clear space around it. Aim for 44×44px on primary buttons, nav links and social icons *(2.5.8)*
- Hover: Subtle elevation increase using hover-elevate utility

## Motion & Interaction - "Subtle Emotional Reinforcement"

**Goal:** Enhance without distracting.

**Interaction Patterns:**
- Button hover: Gentle lift + slight color warmth (handled by built-in utilities). Hover is never the only cue: focus gets the navy outline, and anything that appears on hover also appears on focus *(2.4.7, 2.1.1, 1.4.13)*
- Section reveal: Fade-in + upward motion on scroll (0.3-0.4s ease). Content is still visible if JavaScript fails or the reveal never fires
- Smooth scroll behavior for anchor navigation
- Background parallax on hero for subtle depth
- Respect `prefers-reduced-motion: reduce`: turn off parallax, scroll reveals, lift effects and smooth scrolling, and show content in place *(2.3.3 is AAA, but people with vestibular conditions are who this rule protects)*
- Anything that moves, blinks or scrolls on its own for more than 5 seconds has a pause control *(2.2.2)*
- Nothing flashes more than three times a second *(2.3.1)*
- Any drag interaction (sliders, carousels, reordering) also works with a single tap or click *(2.5.7)*

**DO:**
✅ Subtle, meaningful animations
✅ Focus on accessibility (keyboard navigation, WCAG AA contrast)

**DON'T:**
🚫 Excessive motion or distracting effects
🚫 Auto-playing carousels or videos

## Iconography - "Simple, Rounded, Emotionally Resonant"

**Style:** Duotone line icons with rounded corners (Lucide icons)

**Themes:**
- 🧬 Research → DNA strand in navy on a teal chip, or teal when it's decorative and labelled by text
- 👨‍👩‍👧 Family → Coral heart + people silhouettes
- 🤝 Collaboration → Interlocking circles
- 💡 Discovery → Navy bulb on a sunlight-yellow chip (yellow alone is 1.44:1 on white)
- 📊 Data → Chart/graph in navy, or teal when it's decorative and labelled by text

Icon-only buttons (social links, close, menu) have an accessible name *(4.1.2)*

## Section-Specific Guidelines

### Get Involved Section
- Background: Community/connection themed image with light overlay (92-95% opacity)
- Cards: Semi-transparent (bg-card/95) with backdrop blur
- Layout: 3-column grid (desktop) → single column (mobile)
- Each pathway card: Icon, title, description, CTA button

### Research Roadmap
- Timeline visualization with progress indicators
- Color-coded phases: Active (teal), Upcoming (coral), Future (neutral), each also labelled in words ("Active", "Upcoming", "Future") or with a distinct icon. Phase markers on white get a navy outline, because teal and coral fills alone are 2.50:1 and 1.74:1 *(1.4.1, 1.4.11)*
- Clean, easy-to-scan layout

### Footer
- Two-column layout:
  - Left: "Join the Family" message + newsletter signup
  - Right: Partner logos (COMBINEDBrain, Rare Village) - grayscale with color on hover and on focus. Each logo's alt text names the partner, and a linked logo's name says where it goes *(1.1.1, 2.4.4)*
- Trust indicators: 501(c)(3) status, fiscal sponsor info
- Social links with appropriate icons

## Accessibility Requirements

- WCAG 2.2 AA is the minimum: 4.5:1 for body text, 3:1 for large text (24px and up, or 18.66px and up in bold), and 3:1 for UI boundaries, focus indicators and meaningful icons *(1.4.3, 1.4.11)*
- Focus indicators for keyboard navigation: a 2px navy outline with a 2px white offset, never hidden behind sticky elements *(2.4.7, 2.4.11)*
- Body copy and form fields are never smaller than Body Standard in the type scale, and nothing is smaller than the Captions size *(supports 1.4.4)*
- Semantic HTML throughout: one `h1` per page, headings in order *(1.3.1)*
- Alt text for all meaningful images; `alt=""` for decorative ones *(1.1.1)*
- Form labels explicitly associated. Required fields say "required" in the label, not only with an asterisk or colour *(1.3.1, 3.3.2)*
- Errors show in rust `text-destructive` (5.14:1 on white) with an icon and a message that says how to fix them, are linked to the field with `aria-describedby`, and are announced (`role="alert"` or a focused summary). Never show an error with a red border alone *(3.3.1, 3.3.3, 1.4.1, 4.1.3)*
- Don't make people retype what they already entered in the same flow *(3.3.7)*
- No CAPTCHA puzzles on the newsletter or contact forms; use a honeypot instead. Sign-in pages allow paste and password managers *(3.3.8)*
- Success messages ("Thanks for subscribing") are announced to screen readers *(4.1.3)*
- Skip to content link, visible on focus *(2.4.1)*
- Language: `<html lang="en">` or `lang="es"` matches the page, and any phrase in the other language is wrapped in `lang` *(3.1.1, 3.1.2)*
- Spanish runs about 20-30% longer than English, so buttons, nav and cards grow without truncating or overlapping. Check every component in Spanish *(1.4.10, 1.4.12)*
- Test with screen readers (VoiceOver and NVDA), keyboard only, 200% zoom and 320px width before release

## Critical Design Principles

1. **Family-First**: Design communicates "built by families, for families"
2. **Warmth with Trust**: Balance emotional connection with credibility
3. **Clarity Above All**: Every element serves understanding
4. **Accessible Always**: Families in vulnerable moments need barrier-free access
5. **Hope and Optimism**: Visual language inspires rather than intimidates
6. **Human-Centered**: People before processes, connection before clinical

---

**Result:** Visitors instantly feel *this is a place built by and for families*, not a distant research entity. The design bridges the scientific rigor of medical research with the warmth and humanity of family support.
