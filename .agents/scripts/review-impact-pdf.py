"""Render the supplied impact report for copy review without storing large outputs in Git."""
import fitz

with fitz.open("attached_assets/MED13_Impact_2026-10-13_22h57PT_1791957658155.pdf") as report:
    print(f"Pages: {len(report)}")
    report[0].get_pixmap(matrix=fitz.Matrix(1.5, 1.5)).save("/tmp/med13-impact-report.png")
