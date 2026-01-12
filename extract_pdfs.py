from pypdf import PdfReader
import sys

def extract_info(pdf_path):
    print(f"\n--- Extracting from: {pdf_path} ---")
    try:
        reader = PdfReader(pdf_path)
        
        # Extract text
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
        print("TEXT CONTENT:")
        print(text[:2000] + ("..." if len(text) > 2000 else "")) # Print first 2000 chars
        
        # Extract fields
        fields = reader.get_fields()
        if fields:
            print("\nFORM FIELDS:")
            for field_name, field_value in fields.items():
                print(f"{field_name}: {field_value.get('/V', 'None')}")
        else:
            print("\nNo form fields found.")
    except Exception as e:
        print(f"Error reading {pdf_path}: {e}")

extract_info("/Users/joshuacarter/Downloads/Council_24_Message__Kincare__-_11-25-24.pdf")
extract_info("/Users/joshuacarter/Downloads/de2501 sample.pdf")
