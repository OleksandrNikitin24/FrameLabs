export const FRAMELABS_HUB_DOWNLOAD_URL =
  "https://auth.theframelabs.com/storage/v1/object/sign/Downloads/hub/FrameLabsHub-1.1.5-build8.dmg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hZmNhYzdhZS1kOGIzLTQ1NjgtOGJkZC1lMjRmMGZjYjRkYzYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJEb3dubG9hZHMvaHViL0ZyYW1lTGFic0h1Yi0xLjEuNS1idWlsZDguZG1nIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4NjQwMTMyNywiZXhwIjoxODE3OTM3MzI3fQ.MJORceyc8TQfFK-abrnYxpeMRJ-gleDAMrG0mXu1wqU";

export function startFrameLabsHubDownload() {
  const link = document.createElement("a");
  link.href = FRAMELABS_HUB_DOWNLOAD_URL;
  link.download = "FrameLabsHub-1.1.5-build8.dmg";
  link.rel = "noopener";
  document.body.appendChild(link);
  link.click();
  link.remove();
}
