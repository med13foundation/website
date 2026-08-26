---
name: Classy embed lifecycle
description: Stable wrapper requirements for the hosted Classy donation form.
---

Treat the Classy campaign mount node as disposable. Keep persistent layout, accessibility context, and test hooks on a parent wrapper rather than the element carrying the Classy campaign attributes.

**Why:** The hosted Classy SDK replaces its target node after loading, so attributes attached directly to that target disappear even though the donation controls render correctly.

**How to apply:** Leave the campaign ID and Classy mount attributes on the inner target, and place stable selectors or surrounding layout on a wrapper that the external SDK does not control.