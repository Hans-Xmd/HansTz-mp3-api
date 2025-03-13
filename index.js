const express = require("express");
const cors = require("cors");
const ytdl = require("ytdl-core");

const app = express();
app.use(cors());

app.get("/download/dlmp3", async (req, res) => {
    const url = req.query.url;

    if (!url || !ytdl.validateURL(url)) {
        return res.status(400).json({ error: "Invalid YouTube URL" });
    }

    try {
        res.header("Content-Disposition", 'attachment; filename="audio.mp3"');
        ytdl(url, { filter: "audioonly", format: "mp3" }).pipe(res);
    } catch (error) {
        res.status(500).json({ error: "Error processing request" });
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));
