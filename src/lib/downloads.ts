export const FRAMELABS_HUB_DOWNLOAD_URL =
  "https://auth.theframelabs.com/storage/v1/object/sign/Downloads/hub/FrameLabsHub-1.1.1.dmg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hZmNhYzdhZS1kOGIzLTQ1NjgtOGJkZC1lMjRmMGZjYjRkYzYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJEb3dubG9hZHMvaHViL0ZyYW1lTGFic0h1Yi0xLjEuMS5kbWciLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzg1MzY2MzQzLCJleHAiOjE4MTY5MDIzNDN9.rzYBWxq94hG-9hzL9CHBrx_xudSyLIi2kGsMljySsZM";

export function startFrameLabsHubDownload() {
  const link = document.createElement("a");
  link.href = FRAMELABS_HUB_DOWNLOAD_URL;
  link.download = "FrameLabsHub-1.1.1.dmg";
  link.rel = "noopener";
  document.body.appendChild(link);
  link.click();
  link.remove();
}
