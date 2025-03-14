const express = require("express");
const cors = require("cors");
const ytdl = require("ytdl-core");

const app = express();
app.use(cors());

app.get("/download/dlmp3", async (req, res) => {
    try {
        const url = req.query.url;

        if (!url || !ytdl.validateURL(url)) {
            return res.status(400).json({ error: "Invalid YouTube URL" });
        }

        const info = await ytdl.getInfo(url);

        const title = info.videoDetails.title.replace(/[^\w\s]/gi, "");

        console.log("Downloading:", title);

        res.header("Content-Disposition", `attachment; filename="${title}.mp3"`);
        res.header("Content-Type", "audio/mpeg");

        ytdl(url, {
            filter: "audioonly",
            quality: "highestaudio",
            requestOptions: {
                headers: {
                    "User-Agent": "Mozilla/5.0",
                    "Accept-Language": "en-US,en;q=0.9",
                    "Referer": "https://www.youtube.com/"
                }
            }
        }).pipe(res);
    } catch (error) {
        console.error("Download error:", error);
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
