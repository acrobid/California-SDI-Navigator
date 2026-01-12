from pypdf import PdfReader
import sys

def search_in_pdf(pdf_path, keywords):
    print(f"\n--- Searching in: {pdf_path} ---")
    try:
        reader = PdfReader(pdf_path)
        all_text = ""
        for i, page in enumerate(reader.pages):
            text = page.extract_text()
            all_text += text
        
        lines = all_text.split("\n")
        # Deduplicate snippets if multiple keywords match same lines
        printed_indices = set()
        for i, line in enumerate(lines):
            for kw in keywords:
                if kw.lower() in line.lower():
                    if i not in printed_indices:
                        start = max(0, i-3)
                        end = min(len(lines), i+4)
                        print(f"--- Context for {kw} ---")
                        print("\n".join(lines[start:end]))
                        print("-" * 20)
                        for idx in range(start, end):
                            printed_indices.add(idx)
                    break
    except Exception as e:
        print(f"Error: {e}")

print("ALPA PDF RESULTS")
search_in_pdf("/Users/joshuacarter/Downloads/Council_24_Message__Kincare__-_11-25-24.pdf", ["Kincare", "SDI", "address", "Payroll", "OAK", "LAX"])

print("\nDE2501 PDF RESULTS")
search_in_pdf("/Users/joshuacarter/Downloads/de2501 sample.pdf", ["Employer", "Address", "Supervisor", "Phone", "Last Employer"])
