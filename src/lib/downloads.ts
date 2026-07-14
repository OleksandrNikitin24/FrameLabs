export const FRAMELABS_HUB_DOWNLOAD_URL =
  "https://auth.theframelabs.com/storage/v1/object/sign/Downloads/hub/FrameLabsHub-1.0-20260714-signed.dmg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hZmNhYzdhZS1kOGIzLTQ1NjgtOGJkZC1lMjRmMGZjYjRkYzYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJEb3dubG9hZHMvaHViL0ZyYW1lTGFic0h1Yi0xLjAtMjAyNjA3MTQtc2lnbmVkLmRtZyIsInNjb3BlIjoiZG93bmxvYWQiLCJpYXQiOjE3ODQwNjgyMjYsImV4cCI6MTgxNTYwNDIyNn0.bLm0UKag2am-XWGiwIRkjfGUt3_2pHJGXTQ_vTb20sg";

export function startFrameLabsHubDownload() {
  const link = document.createElement("a");
  link.href = FRAMELABS_HUB_DOWNLOAD_URL;
  link.download = "FrameLabsHub-1.0-20260714-signed.dmg";
  link.rel = "noopener";
  document.body.appendChild(link);
  link.click();
  link.remove();
}
