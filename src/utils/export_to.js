import PptxGenJS from "pptxgenjs";
import html2canvas from "html2canvas";
import officelogo from "../decisivePulseAI/resources/home/officelogo.jpg";
import jsPDF from "jspdf";

export const loadImageAsBase64 = (imageSrc) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous"; // To handle CORS issues
    img.src = imageSrc;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL("image/jpeg"));
    };
    img.onerror = reject;
  });
};

export const exportAllToPPT = async (setSelectedPage, pages, refs, setShowPages) => {
  const pptx = new PptxGenJS();
  const base64Logo = await loadImageAsBase64(officelogo);
  const slideWidthInches = 10;
  const slideHeightInches = 7.5;

  const addRefContentToPPT = async (ref) => {
    if (!ref || !ref.current) {
      console.error("Ref is not available:", ref);
      return;
    }
    const element = ref.current;
    const canvas = await html2canvas(element, { scale: 2, useCORS: true, logging: false });
    const imgData = canvas.toDataURL("image/jpeg", 0.5); // JPEG format with compression

    const imgWidthPx = canvas.width;
    const imgHeightPx = canvas.height;
    const imgWidthInches = imgWidthPx / 96;
    const imgHeightInches = imgHeightPx / 96;

    let outputWidth, outputHeight;
    if (imgWidthInches > slideWidthInches || imgHeightInches > slideHeightInches) {
      const bestRatio = Math.min(slideWidthInches / imgWidthInches, slideHeightInches / imgHeightInches);
      outputWidth = imgWidthInches * bestRatio;
      outputHeight = imgHeightInches * bestRatio;
    } else {
      outputWidth = imgWidthInches;
      outputHeight = imgHeightInches;
    }

    const xPosition = (slideWidthInches - outputWidth) / 2;
    const yPosition = 0.5;

    const slide = pptx.addSlide();
    slide.background = { color: "008085" };

    slide.addImage({ data: imgData, x: xPosition, y: yPosition, w: outputWidth, h: outputHeight });
    slide.addImage({ data: base64Logo, x: 9, y: 0, w: 1, h: 0.6 });

    const now = new Date();
    const dateString = now.toLocaleString();
    slide.addText(dateString, { x: 0.2, y: 0.2, fontSize: 12, color: "FFFFFF" });
  };

  // Add first static page from ref
  await addRefContentToPPT(refs[0].ref);

  for (let i = 0; i < pages.length; i++) {
    setSelectedPage(pages[i]);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const chartElement = document.getElementById("Main");
    chartElement.style.backgroundColor = "#008085";
    chartElement.style.color = "white";

    const canvas = await html2canvas(chartElement, { scale: 2, useCORS: true, logging: false });
    const imgData = canvas.toDataURL("image/jpeg", 0.5); // JPEG format with compression

    const imgWidthPx = canvas.width;
    const imgHeightPx = canvas.height;
    const imgWidthInches = imgWidthPx / 96;
    const imgHeightInches = imgHeightPx / 96;

    let outputWidth, outputHeight;
    if (imgWidthInches > slideWidthInches || imgHeightInches > slideHeightInches) {
      const bestRatio = Math.min(slideWidthInches / imgWidthInches, slideHeightInches / imgHeightInches);
      outputWidth = imgWidthInches * bestRatio;
      outputHeight = imgHeightInches * bestRatio;
    } else {
      outputWidth = imgWidthInches;
      outputHeight = imgHeightInches;
    }

    const xPosition = (slideWidthInches - outputWidth) / 2;
    const yPosition = 0.5;

    const slide = pptx.addSlide();
    slide.background = { color: "008085" };

    slide.addImage({ data: imgData, x: xPosition, y: yPosition, w: outputWidth, h: outputHeight });
    slide.addImage({ data: base64Logo, x: 9, y: 0, w: 1, h: 0.6 });

    const now = new Date();
    const dateString = now.toLocaleString();
    slide.addText(dateString, { x: 0.2, y: 0.2, fontSize: 12, color: "FFFFFF" });

    if (i === 0) {
      slide.addText("Descriptive Insights", {
        x: 4.0,
        y: 0.2,
        fontSize: 18,
        color: "FFFFFF",
      });
    }
  }

  // Add final static page from ref
  await addRefContentToPPT(refs[2].ref);

  setShowPages(false);
  pptx.writeFile({ fileName: "All_Dashboards.pptx" });
};


export const exportAllToPDF = async (setSelectedPage, pages, refs, setShowPages) => {
  const pdfWidth = 420;
  const pdfHeight = 297;
  const headerHeight = 30;
  const pdf = new jsPDF("landscape", "mm", [pdfWidth, pdfHeight]);
  const scale = 2; // Lower the scale to reduce size

  const addRefContentToPDF = async (ref, isFirstPage = false) => {
    if (!ref || !ref.current) {
      console.error("Ref is not available:", ref);
      return;
    }
    const element = ref.current;
    const canvas = await html2canvas(element, {
      scale, // Reduced scale
      useCORS: true,
      logging: false,
    });
    const imgData = canvas.toDataURL("image/jpeg", 0.5); // Use JPEG with compression

    const imgWidthInMM = (canvas.width / scale) * 0.264583;
    const imgHeightInMM = (canvas.height / scale) * 0.264583;

    const maxImgWidth = pdfWidth;
    const maxImgHeight = pdfHeight - headerHeight;

    let outputWidth, outputHeight;
    if (imgWidthInMM > maxImgWidth || imgHeightInMM > maxImgHeight) {
      const bestRatio = Math.min(maxImgWidth / imgWidthInMM, maxImgHeight / imgHeightInMM);
      outputWidth = imgWidthInMM * bestRatio;
      outputHeight = imgHeightInMM * bestRatio;
    } else {
      outputWidth = imgWidthInMM;
      outputHeight = imgHeightInMM;
    }

    const x = (pdfWidth - outputWidth) / 2;
    const y = headerHeight;

    if (!isFirstPage) pdf.addPage();

    pdf.setFillColor(0, 128, 133);
    pdf.rect(0, 0, pdfWidth, pdfHeight, "F");
    pdf.addImage(imgData, "JPEG", x, y, outputWidth, outputHeight, undefined, "FAST");
  };

  // Capture first static page without adding a new page
  await addRefContentToPDF(refs[0].ref, true);
  await addRefContentToPDF(refs[1].ref);

  for (let i = 0; i < pages.length; i++) {
    setSelectedPage(pages[i]);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const chartElement = document.getElementById("Main");
    chartElement.style.backgroundColor = "#008085";
    chartElement.style.color = "white";

    const canvas = await html2canvas(chartElement, {
      scale,
      useCORS: true,
      logging: false,
    });
    const imgData = canvas.toDataURL("image/jpeg", 0.5); // JPEG with compression

    const imgWidthInMM = (canvas.width / scale) * 0.264583;
    const imgHeightInMM = (canvas.height / scale) * 0.264583;

    const maxImgWidth = pdfWidth;
    const maxImgHeight = pdfHeight - headerHeight;

    let outputWidth, outputHeight;
    if (imgWidthInMM > maxImgWidth || imgHeightInMM > maxImgHeight) {
      const bestRatio = Math.min(maxImgWidth / imgWidthInMM, maxImgHeight / imgHeightInMM);
      outputWidth = imgWidthInMM * bestRatio;
      outputHeight = imgHeightInMM * bestRatio;
    } else {
      outputWidth = imgWidthInMM;
      outputHeight = imgHeightInMM;
    }

    const x = (pdfWidth - outputWidth) / 2;
    const y = headerHeight;

    pdf.addPage();
    pdf.setFillColor(0, 128, 133);
    pdf.rect(0, 0, pdfWidth, pdfHeight, "F");

    pdf.addImage(imgData, "JPEG", x, y, outputWidth, outputHeight, undefined, "FAST");
  }

  await addRefContentToPDF(refs[2].ref);
  setShowPages(false);
  pdf.save("All_Dashboards.pdf");
};

