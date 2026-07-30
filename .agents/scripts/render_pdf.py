import fitz

doc = fitz.open("attached_assets/Med13_Oct2026_events_1785389501546.pdf")
print(f"Pages: {doc.page_count}")
for i, page in enumerate(doc):
    pix = page.get_pixmap(matrix=fitz.Matrix(2, 2))
    out = f".agents/outputs/events_page_{i+1}.png"
    pix.save(out)
    print(f"Saved {out} ({page.rect.width:.0f}x{page.rect.height:.0f} pts)")
doc.close()
