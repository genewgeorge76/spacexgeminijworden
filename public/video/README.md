# Hero Videos

Drop video files here named EXACTLY:

- `hero-paving.mp4`  (H.264, the universal fallback)
- `hero-paving.webm` (AV1 or VP9, smaller, modern browsers)

## Specs

- 1920×1080, 24 or 30 fps
- 6–12 second seamless loop (no fade — first frame must match last frame)
- MP4 target size: 3–6 MB
- WebM target size: 1–3 MB
- NO audio track (we mute anyway, and stripping it shrinks the file)

## Encode commands (ffmpeg)

MP4 (H.264, mobile-safe):
`ffmpeg -i source.mov -an -vcodec libx264 -crf 26 -preset slow -vf "scale=1920:-2" -movflags +faststart hero-paving.mp4`

WebM (AV1, smaller):
`ffmpeg -i source.mov -an -c:v libsvtav1 -crf 35 -preset 6 -vf "scale=1920:-2" hero-paving.webm`

If neither file is present, the hero falls back to the still poster — nothing breaks.
