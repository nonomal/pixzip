import { contextBridge, ipcRenderer } from "electron";

const lossApi = {
  "dialog:openFolder": () => ipcRenderer.invoke("dialog:openFolder"),
  isMacOS: process.platform === "darwin",
  "space:get": () => ipcRenderer.invoke("space:get"),
  "space:add": () => ipcRenderer.invoke("space:add"),
  "space:patch": (spaces: Space[]) => ipcRenderer.send("space:patch", spaces),
  "space:del": (spaceId: string) => ipcRenderer.send("space:del", spaceId),
  "space:setCurrentId": () => ipcRenderer.send("space:setCurrentId"),
  "space:getCurrentId": () => ipcRenderer.invoke("space:getCurrentId"),
  "file:add": (files: SendFile[]) => ipcRenderer.send("file:add", files),
  "file:clear": (spaceId: string) => ipcRenderer.send("file:clear", spaceId),
  "file:showInFolder": (path: string) =>
    ipcRenderer.send("file:showInFolder", path),
  "compress:processing": (fn) => ipcRenderer.on("compress:processing", fn),
  "compress:success": (fn) => ipcRenderer.on("compress:success", fn),
  "compress:failed": (fn) => ipcRenderer.on("compress:failed", fn),
  "compress:remove": () => {
    ipcRenderer.removeAllListeners("compress:processing");
    ipcRenderer.removeAllListeners("compress:success");
    ipcRenderer.removeAllListeners("compress:failed");
  },
};

contextBridge.exposeInMainWorld("lossApi", lossApi);
