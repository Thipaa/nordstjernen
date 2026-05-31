import express from "express";
import cors from "cors";
import { spawn } from "child_process";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(__dirname, "..");

const app = express();
app.use(cors());
app.use(express.json());

const SYSTEM = `You are a helpful assistant for Nordstjernen — a 100-year-old traditional Haikutter (sailing cutter) available for holiday trips and private charters on the Baltic and North Sea.
Use your available tools (get_ship_info, get_tours_info, get_contact_info, check_availability) to give accurate answers.
Be warm and friendly. Respond in the same language the user writes in (German or English).`;

app.post("/api/chat", (req, res) => {
  const { messages } = req.body;
  if (!messages?.length) return res.status(400).json({ error: "messages required" });

  // Serialize conversation history into the prompt so claude -p has full context
  const history = messages
    .map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`)
    .join("\n");

  const prompt = `${SYSTEM}\n\nConversation so far:\n${history}\n\nAssistant:`;

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  const send = (obj) => res.write(`data: ${JSON.stringify(obj)}\n\n`);

  // Run claude in print mode from the project root (picks up .claude/settings.json).
  // --allowedTools restricts Claude to ONLY the MCP tools — no file reads, no bash.
  const MCP_TOOLS = [
    "mcp__nordstjernen__get_ship_info",
    "mcp__nordstjernen__get_tours_info",
    "mcp__nordstjernen__get_contact_info",
    "mcp__nordstjernen__check_availability",
  ].join(",");

  const proc = spawn("claude", ["-p", prompt, "--allowedTools", MCP_TOOLS], {
    cwd: PROJECT_ROOT,
  });

  proc.stdout.on("data", (chunk) => {
    send({ type: "text", text: chunk.toString() });
  });

  proc.stderr.on("data", (chunk) => {
    console.error("[claude stderr]", chunk.toString());
  });

  proc.on("close", () => {
    send({ type: "done" });
    res.end();
  });

  proc.on("error", (err) => {
    send({ type: "error", message: `Could not start claude CLI: ${err.message}` });
    res.end();
  });
});

app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Bridge server running on http://localhost:${PORT}`);
  console.log("Using: claude CLI (no API key required)");
});
