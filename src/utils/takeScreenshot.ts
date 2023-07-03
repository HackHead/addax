import html2canvas from "html2canvas";

export const downloadImage = (blob: Blob, fileName: string): void => {
    const fakeLink = window.document.createElement("a");
    fakeLink.style.display = "none";
    fakeLink.download = fileName;
  
    fakeLink.href = URL.createObjectURL(blob);
  
    document.body.appendChild(fakeLink);
    fakeLink.click();
    document.body.removeChild(fakeLink);
  
    URL.revokeObjectURL(fakeLink.href);
  };
  
  export const takeScreenshot = async (
    el: HTMLDivElement = document.querySelector('.lorem-ipsum')!,
    imageFileName: string
  ): Promise<void> => {
    console.log(el)
    const canvas = await html2canvas(el, {
        allowTaint: false,
        useCORS: true,
        scale: 2,
    });
    
    const image = canvas.toDataURL("image/png", 1.0);
  
    const blob = await fetch(image).then((res) => res.blob());
  
    downloadImage(blob, imageFileName);
  };
