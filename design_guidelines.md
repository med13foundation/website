# MED13 Foundation Design Guidelines

## Design Approach: Medical Information Architecture

Following established patterns from leading medical research foundations (Dana-Farber, Mayo Clinic Foundation) and rare disease organizations, prioritizing **clarity, trust, and accessibility** over visual flourish. This is a mission-critical information platform where families seek hope and researchers need data - every design choice must reinforce credibility and ease of use.

## Color System

**Primary Palette:**
- Deep Medical Blue: #1B4B7E (headers, primary CTAs, trust elements)
- Soft Teal: #2D7A89 (secondary elements, highlights, interactive states)
- Warm Coral: #E67E5C (donation buttons, urgent CTAs, emphasis)
- Deep Charcoal: #2D3748 (body text, high contrast readability)

**Supporting Colors:**
- Light Sky: #E8F4F8 (section backgrounds, gentle separation)
- Soft Sage: #F0F7F4 (alternate sections, calming areas)
- Warm Cream: #FFF9F5 (backgrounds for critical information)
- Pure White: #FFFFFF (primary backgrounds, cards, breathing room)

**Semantic Colors:**
- Success Green: #2F855A (research milestones, progress indicators)
- Alert Amber: #D97706 (important notices, upcoming deadlines)
- Neutral Gray: #718096 (secondary text, subtle elements)

## Typography Hierarchy

**Font Families:**
- Primary: Inter (Google Fonts) - exceptional readability for medical content
- Headings: Poppins (Google Fonts) - professional, approachable authority

**Scale:**
- Hero Headline: Poppins 48px/56px, font-weight 700 (desktop) | 32px/40px (mobile)
- Section Heading: Poppins 36px/44px, font-weight 600
- Subsection: Poppins 24px/32px, font-weight 600
- Card Title: Poppins 20px/28px, font-weight 600
- Body Large: Inter 18px/28px, font-weight 400 (introductory paragraphs)
- Body Standard: Inter 16px/26px, font-weight 400 (primary content)
- Body Small: Inter 14px/22px, font-weight 400 (captions, metadata)
- Link Text: Inter 16px/26px, font-weight 500, underline on hover

## Layout System

**Spacing Scale:** Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24 for consistent rhythm
- Component padding: p-6 to p-8
- Section spacing: py-16 to py-24 (desktop) | py-12 to py-16 (mobile)
- Card gaps: gap-6 to gap-8
- Text spacing: mb-4 to mb-6 between paragraphs

**Container Strategy:**
- Full-width sections with inner max-w-7xl for hero and major sections
- Content-focused max-w-4xl for text-heavy pages (Who We Are, Research)
- max-w-prose for long-form reading sections

## Component Library

### Navigation
- Fixed top navigation with subtle shadow on scroll
- Logo left, primary links center, "Donate" button right (warm coral, medium prominence)
- Mobile: Hamburger menu with full-screen overlay, clean transitions
- Sticky behavior for accessibility to donation CTA

### Hero Section
**NO large hero image** - this is a medical research foundation, not a lifestyle brand
- Clean typography-first hero with subtle gradient background (deep blue to teal, 20% opacity)
- Vision statement as primary headline
- Mission as subheading
- Key stat badges (51+ families, research milestones) as trust indicators
- Two-button CTA: "Join Research Cohort" (primary) + "Learn Our Story" (secondary)
- Height: 70vh maximum, ensuring content visibility

### Cards & Content Blocks
- Clean white cards with subtle shadow (0 4px 6px rgba(0,0,0,0.05))
- 8px border-radius for gentle, professional feel
- Icon + Title + Description pattern for feature cards
- Hover state: slight elevation increase, no dramatic transforms

### Call-to-Action Sections
Three primary pathways (Join Research, Board, Volunteer):
- Icon-driven cards in 3-column grid (desktop) | single column (mobile)
- Each card: Icon (64px Medical SVG from Heroicons), Title, 2-3 sentence description, Link
- Background: Soft sage alternating with white for visual rhythm

### Timeline Visualization (Roadmap)
- Vertical timeline on mobile, horizontal steps on desktop
- Each phase: Year range, milestone title, status indicator (completed/in-progress/upcoming)
- Progress bar showing current position
- Color-coded: completed (success green), active (teal), future (neutral gray)

### Statistics Display
Quick Facts section:
- 2-column grid of stat cards
- Large number (36px, Poppins bold) + label (14px, Inter)
- Subtle icon accompaniment from Heroicons medical set

### Forms & Newsletter
- Clean, accessible form inputs with clear labels
- Input fields: 1px border (neutral gray), focus state (teal ring)
- Generous padding (p-4) for touch targets
- Inline validation messages
- Submit button: Warm coral primary color

### Footer
- Comprehensive 4-column layout (desktop) | accordion stack (mobile)
- Columns: About, Get Involved, Resources, Contact
- Newsletter signup embedded in footer
- Social icons (when active): Heroicons outline style
- Partnership logos: COMBINEDBrain, Rare Village (grayscale, subtle)
- Legal links and copyright

## Imagery Strategy

**Minimal, Purposeful Use:**
- NO hero background images
- Small organizational partner logos only (COMBINEDBrain, Rare Village) - 120px max width
- Optional: Single tasteful illustration for "Community" section - abstract, geometric representation of connection (not people photos)
- Icon library: Heroicons (medical, user, chart, calendar) for visual hierarchy

**Image Specifications:**
- Partner logos: SVG format, monochrome or muted color
- If illustration used: Soft teal/blue color palette, max 400px width, right-aligned with text wrap

## Interaction Patterns

**Minimal Animation:**
- Subtle fade-in on scroll for section entry (0.3s ease)
- Smooth scroll behavior for anchor links
- Button hover: slight scale (1.02) with shadow increase
- Card hover: elevation from shadow-sm to shadow-md
- NO parallax, NO carousel autoplay, NO distracting motion

**Accessibility Requirements:**
- WCAG AA contrast ratios minimum (4.5:1 for body text)
- Focus indicators: 2px teal outline for keyboard navigation
- Skip to content link
- Semantic HTML throughout
- Alt text for all images/icons
- Form labels explicitly associated

## Page-Specific Layouts

**Homepage:**
1. Hero (vision/mission/stats) - 70vh
2. Three-path CTA cards (Research/Board/Volunteer) - equal height grid
3. Who We Are (2-column: text + organizational structure) - max-w-6xl
4. Research Roadmap timeline - full-width container
5. Upcoming Events - 2-column cards
6. Newsletter + Footer

**Who We Are Page:**
- Single column narrative flow, max-w-4xl
- Partnership section: Logo + description pairs
- Team structure visualization (if applicable)

**Get Involved Hub:**
- Tab interface or section jumps for three pathways
- Each pathway: Description + Requirements + How to Start
- Prominent contact CTAs for each section

## Critical Design Principles

1. **Information First:** Every pixel serves understanding, not decoration
2. **Trust Through Clarity:** Professional restraint over trendy effects  
3. **Accessibility Always:** Families in crisis need barrier-free access
4. **Purposeful White Space:** Breathing room around dense medical content
5. **Progressive Disclosure:** Don't overwhelm - layer information thoughtfully

This is a foundation built by families for families - the design must honor that vulnerability with respect, clarity, and unwavering professionalism.