import type { KnowledgePermissionState, KnowledgeSourceId } from "../types";

export async function requestKnowledgePermission(id: KnowledgeSourceId): Promise<KnowledgePermissionState> {
  try {
    if (id === "photos") return requestPhotos();
    if (id === "folder") return requestFolder("folder");
    if (id === "projects") return requestFolder("projects");
    return requestCalendar();
  } catch (error) {
    return {
      id,
      status: "denied",
      detail: error instanceof Error ? error.message : "授权失败"
    };
  }
}

async function requestPhotos(): Promise<KnowledgePermissionState> {
  if (window.showOpenFilePicker) {
    const handles = await window.showOpenFilePicker({
      multiple: true,
      types: [
        {
          description: "Images",
          accept: {
            "image/*": [".png", ".jpg", ".jpeg", ".webp", ".heic"]
          }
        }
      ]
    });

    return {
      id: "photos",
      status: "authorized",
      detail: `已选择 ${handles.length} 张图片`
    };
  }

  const files = await pickFiles("image/*", true);
  return {
    id: "photos",
    status: files.length ? "authorized" : "unavailable",
    detail: files.length ? `已选择 ${files.length} 张图片` : "当前环境不支持图库选择"
  };
}

async function requestFolder(id: "folder" | "projects"): Promise<KnowledgePermissionState> {
  if (window.showDirectoryPicker) {
    const handle = await window.showDirectoryPicker();
    return {
      id,
      status: "authorized",
      detail: `已授权：${handle.name}`
    };
  }

  const files = await pickDirectory();
  return {
    id,
    status: files.length ? "authorized" : "unavailable",
    detail: files.length ? `已选择 ${files.length} 个文件` : "当前环境不支持文件夹授权"
  };
}

async function requestCalendar(): Promise<KnowledgePermissionState> {
  const files = await pickFiles(".ics,.csv", false);
  return {
    id: "calendar",
    status: files.length ? "authorized" : "unavailable",
    detail: files.length ? `已导入：${files[0].name}` : "可在 Eazo 中改接系统日历或后端 OAuth"
  };
}

function pickFiles(accept: string, multiple: boolean): Promise<File[]> {
  return new Promise((resolve) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = accept;
    input.multiple = multiple;
    input.style.display = "none";
    input.addEventListener(
      "change",
      () => {
        resolve(Array.from(input.files ?? []));
        input.remove();
      },
      { once: true }
    );
    document.body.appendChild(input);
    input.click();
  });
}

function pickDirectory(): Promise<File[]> {
  return new Promise((resolve) => {
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    input.webkitdirectory = true;
    input.style.display = "none";
    input.addEventListener(
      "change",
      () => {
        resolve(Array.from(input.files ?? []));
        input.remove();
      },
      { once: true }
    );
    document.body.appendChild(input);
    input.click();
  });
}
