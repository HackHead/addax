import { CalendarEvent } from "../components/organisms/Calendar";

export const exportSchema = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, data?: CalendarEvent[]) => {
    event.preventDefault();
    const json = JSON.stringify(data);
    const blob = new Blob([json], { type: 'text/json' });
  
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'export.json';
  
    document.body.appendChild(link);
    link.click();
  
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
}

// dataHandlers.ts

// ...

export const importSchema = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<CalendarEvent[] | null> => {
    return new Promise((resolve, reject) => {
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = ".json"; // Specify the accepted file type here
  
      fileInput.onchange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        if (target.files && target.files.length > 0) {
          const file = target.files[0];
          const reader = new FileReader();
  
          reader.onload = (e: ProgressEvent<FileReader>) => {
            try {
              const contents = e.target?.result as string;
              const importedData: CalendarEvent[] = JSON.parse(contents);

              resolve(importedData);
            } catch (error) {
              reject(error);
            }
          };
  
          reader.onerror = (e: ProgressEvent<FileReader>) => {
            reject(e.target?.error);
          };
  
          reader.readAsText(file);
        } else {
          reject(new Error("No file selected."));
        }
      };
  
      fileInput.click();
    });
  };
  
  // ...
  