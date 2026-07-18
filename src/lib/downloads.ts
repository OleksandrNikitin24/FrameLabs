export const FRAMELABS_HUB_DOWNLOAD_URL =
  "https://auth.theframelabs.com/storage/v1/object/sign/Downloads/hub/FrameLabsHub-1.0.dmg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hZmNhYzdhZS1kOGIzLTQ1NjgtOGJkZC1lMjRmMGZjYjRkYzYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJEb3dubG9hZHMvaHViL0ZyYW1lTGFic0h1Yi0xLjAuZG1nIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4NDQxMjk0MiwiZXhwIjoxODE1OTQ4OTQyfQ.EE9UTagz3oY2bm5fKOwX0DV2zzuxcCYBbJ4syrmK2TU";

export function startFrameLabsHubDownload() {
  const link = document.createElement("a");
  link.href = FRAMELABS_HUB_DOWNLOAD_URL;
  link.download = "FrameLabsHub-1.0.dmg";
  link.rel = "noopener";
  document.body.appendChild(link);
  link.click();
  link.remove();
}
