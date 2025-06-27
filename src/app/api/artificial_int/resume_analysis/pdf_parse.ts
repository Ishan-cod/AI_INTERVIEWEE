import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";


async function pdf_parser(local_pdf_path: string): Promise<string> {
  try {
    const loader = new PDFLoader(local_pdf_path);
    if (!loader) {
      throw new Error("PDF path invalid");
    }

    const parsed_doc = await loader.load();
    if (!parsed_doc) {
      throw new Error("Document loading failed");
    }

    const raw_pdf_text = parsed_doc[0].pageContent;
    if (raw_pdf_text.length == 0) {
      throw new Error("PDF empty / Error reading pdf file");
    }

    return raw_pdf_text;
  } catch (error) {
    throw new Error("Error parsing_pdf");
  }
}

export { pdf_parser };
