/// <reference types="vite/client" />

interface Window {
  showOpenFilePicker?: (options?: {
    multiple?: boolean;
    types?: Array<{
      description: string;
      accept: Record<string, string[]>;
    }>;
  }) => Promise<FileSystemFileHandle[]>;
  showDirectoryPicker?: () => Promise<FileSystemDirectoryHandle>;
}

interface HTMLInputElement {
  webkitdirectory: boolean;
}

interface FileSystemFileHandle {
  kind: "file";
  name: string;
  getFile: () => Promise<File>;
}

interface FileSystemDirectoryHandle {
  kind: "directory";
  name: string;
}
