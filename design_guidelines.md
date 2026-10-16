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
- Accent yellow for hope and optimism touches

## Typography - "Readable, Modern, Gentle"

Communicate clarity and care at first glance with humanistic, approachable type.

**Font Families:**
- **Headings**: Nunito Sans - Rounded, humanistic, family-friendly, easy to read for all ages
- **Body**: Inter - Professional yet friendly, excellent legibility
- **Highlights/Quotes**: Nunito Sans (italic or semibold) or Inter. No third display family; Playfair Display is no longer loaded

**Type Scale:**
- Hero Headline: Nunito Sans 36-40px on phones, 48-60px from tablet up, font-weight 700-800
- Section Heading: Nunito Sans 32-40px, font-weight 600-700
- Subsection: Nunito Sans 20-24px, font-weight 600
- Body Large: Inter 18-20px, font-weight 400, line-height 1.7
- Body Standard: Inter 16px, font-weight 400, line-height 1.7
- Captions and body copy: Inter 14px minimum, font-weight 400
- Badges, tags and small labels: 12px minimum (`text-xs`), never running text
- Stats and figures: tabular figures (`tabular-nums`) in the heading or body family; no monospace

**Line Height:** 1.6-1.8 for comfort and accessibility

## Hero Section - "Families and Discovery Together"

**Goal:** Make the mission statement *felt* before it's read.

**Design Approach:**
- Background: Medical research/DNA imagery under a teal-to-coral gradient overlay (85-90% opacity)
- Text: Navy text over the light gradient ensures readability (white fails contrast here)
- Visual metaphor: Subtle scientific elements (DNA strands, molecular patterns) suggest research without being clinical
- Call-to-action buttons:
  - Primary: White background with navy text - high contrast, approachable
  - Secondary: Underlined navy text link beside the primary button - quieter, so the primary stays the clear first step

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
- Use overlays (85-95% opacity gradients) to ensure text readability
- Cards can have semi-transparent backgrounds (95% opacity) with backdrop blur

## Layout & Structure

**Goal:** Balance storytelling with action, create calm rhythm.

**Key Principles:**
- Maximum section width: 1100-1200px for optimal readability
- Generous padding: 80-100px between sections (py-16 to py-24)
- Use asymmetric grid sections where appropriate (alternating photo/text)
- Soft dividers: Faint gradient lines or curved section breaks
- Replace dense lists with icon cards (rounded corners, pastel backgrounds)

**Cards & Components:**
- Clean white cards with subtle elevation
- 6-8px border radius for gentle, approachable feel
- Semi-transparent cards (bg-card/95) with backdrop blur over background images
- Icon + Title + Description pattern
- Hover: Subtle elevation increase using hover-elevate utility

## Motion & Interaction - "Subtle Emotional Reinforcement"

**Goal:** Enhance without distracting.

**Interaction Patterns:**
- Button hover: Gentle lift + slight color warmth (handled by built-in utilities)
- Smooth scroll behavior for anchor navigation
- Motion stays subtle: hover feedback only; no scroll-triggered reveals or parallax

**DO:**
✅ Subtle, meaningful animations
✅ Focus on accessibility (keyboard navigation, WCAG AA contrast)

**DON'T:**
🚫 Excessive motion or distracting effects
🚫 Auto-playing carousels or videos

## Iconography - "Simple, Rounded, Emotionally Resonant"

**Style:** Duotone line icons with rounded corners (Lucide icons)

**Themes:**
- 🧬 Research → DNA strand in teal
- 👨‍👩‍👧 Family → Coral heart + people silhouettes
- 🤝 Collaboration → Interlocking circles
- 💡 Discovery → Sunlight yellow bulb
- 📊 Data → Chart/graph in teal

## Section-Specific Guidelines

### Get Involved Section
- Background: Community/connection themed image with light overlay (92-95% opacity)
- Cards: Semi-transparent (bg-card/95) with backdrop blur
- Layout: 3-4 column grid on desktop, matching the number of pathways (four today) → single column on mobile
- Each pathway card: Icon, title, description, CTA button

### Research Roadmap
- Timeline visualization with progress indicators
- Color-coded phases: Active (teal), Upcoming (coral), Future (neutral)
- Clean, easy-to-scan layout

### Footer
- Four link columns on desktop, stacking to one column on phones:
  - About: Our Story, Our Community, Impact and Progress, What Is MED13 Syndrome
  - Get Involved: Research Cohort, board, volunteering, other ways to give
  - Resources: partners as text links (COMBINEDBrain, Simons Searchlight), Events, Gala, Symposium
  - Contact: the research email
- Bottom row: social icons (each with an accessible name), copyright, and the fiscal-sponsor note (Rare Village, a 501(c)(3), with EIN)

## Accessibility Requirements

- WCAG AA contrast ratios minimum (4.5:1 for body text)
- Focus indicators for keyboard navigation
- Semantic HTML throughout
- Alt text for all images
- Form labels explicitly associated
- Skip to content link
- Test with screen readers

## Critical Design Principles

1. **Family-First**: Design communicates "built by families, for families"
2. **Warmth with Trust**: Balance emotional connection with credibility
3. **Clarity Above All**: Every element serves understanding
4. **Accessible Always**: Families in vulnerable moments need barrier-free access
5. **Hope and Optimism**: Visual language inspires rather than intimidates
6. **Human-Centered**: People before processes, connection before clinical

---

**Result:** Visitors instantly feel *this is a place built by and for families*, not a distant research entity. The design bridges the scientific rigor of medical research with the warmth and humanity of family support.
