export const FRAMELABS_HUB_DOWNLOAD_URL =
  "https://auth.theframelabs.com/storage/v1/object/sign/Downloads/hub/FrameLabsHub-1.1.7.dmg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hZmNhYzdhZS1kOGIzLTQ1NjgtOGJkZC1lMjRmMGZjYjRkYzYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJEb3dubG9hZHMvaHViL0ZyYW1lTGFic0h1Yi0xLjEuNy5kbWciLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzg2NDg4NDc5LCJleHAiOjE4MTgwMjQ0Nzl9.tsmdutEN0-JcoZCv8czJOl3J_Kv0S47PjpDGv1BCyjQ";

export function startFrameLabsHubDownload() {
  const link = document.createElement("a");
  link.href = FRAMELABS_HUB_DOWNLOAD_URL;
  link.download = "FrameLabsHub-1.1.7.dmg";
  link.rel = "noopener";
  document.body.appendChild(link);
  link.click();
  link.remove();
}
