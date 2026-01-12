from pypdf import PdfReader
reader = PdfReader("/Users/joshuacarter/Downloads/de2501 sample.pdf")
text = ""
for page in reader.pages:
    text += page.extract_text() + "\n"
lines = text.split("\n")
for i, line in enumerate(lines):
    if "A15" in line or "A17" in line or "A28" in line:
        print(f"--- {line} ---")
        print("\n".join(lines[i:i+10]))
        print("-" * 30)
