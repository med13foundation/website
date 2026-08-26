import fitz
from pathlib import Path

source = Path("attached_assets/medopathies_scientific_symposium_draft_1787721485503.pdf")
output = Path(".agents/outputs/symposium-pages")
output.mkdir(parents=True, exist_ok=True)

document = fitz.open(source)
print(f"pages: {document.page_count}")
for index, page in enumerate(document):
    text = " ".join(page.get_text().split())
    print(f"page {index + 1}: {text[:600]}")
    pixmap = page.get_pixmap(matrix=fitz.Matrix(1.5, 1.5), alpha=False)
    destination = output / f"page-{index + 1:02d}.png"
    pixmap.save(destination)
    print(f"rendered: {destination}")