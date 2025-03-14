const express = require("express");
const cors = require("cors");
const ytdl = require("ytdl-core");

const app = express();
app.use(cors());

app.get("/download/dlmp3", async (req, res) => {
    try {
        const url = req.query.url;

        // Validate the YouTube URL
        if (!url || !ytdl.validateURL(url)) {
            return res.status(400).json({ error: "Invalid YouTube URL" });
        }

        const info = await ytdl.getInfo(url);
        const title = info.videoDetails.title.replace(/[^\w\s]/gi, "");  // Clean filename

        console.log("Downloading:", title); // Log the video title

        // Set headers for the response
        res.header("Content-Disposition", `attachment; filename="${title}.mp3"`);
        res.header("Content-Type", "audio/mpeg");

        // Fetch the audio stream and pipe it to the response
        ytdl(url, {
            filter: "audioonly",
            quality: "highestaudio",
        }).pipe(res);
    } catch (error) {
        console.error("Download error:", error);  // Log the error for debugging
        res.status(500).json({ error: error.message }); // Send a more detailed error response
    }
});

// Set the port for the server to listen on
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
