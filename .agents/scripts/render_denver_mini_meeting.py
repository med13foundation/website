import fitz
from pathlib import Path
src = Path('attached_assets/denver_mini_meeting_meds_1789631014871.pdf')
out = Path('.agents/outputs/denver-mini-meeting')
doc = fitz.open(src)
print(f'pages={doc.page_count}')
for i, page in enumerate(doc):
    pix = page.get_pixmap(matrix=fitz.Matrix(2, 2), alpha=False)
    target = out / f'page-{i+1}.png'
    pix.save(target)
    print(target)
    print(page.get_text())
