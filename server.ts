import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;
const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'rsvps.json');

// Ensure data directory and file exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const initialRsvps = [
  {
    id: "1",
    name: "Ust. Abdullah Mansur",
    presence: "hadir",
    wish: "Selamat ya nanda Arga atas khitannya. Semoga setelah khitan ini tumbuh menjadi anak yang sholeh, rajin beribadah, taat kepada Allah SWT, serta berbakti kepada kedua orang tua. Aamiin ya Rabbal Alamin.",
    createdAt: new Date(Date.now() - 3 * 3600 * 1000).toISOString(), // 3 hours ago
    likes: 0,
    replies: []
  },
  {
    id: "2",
    name: "Tante Ria & Om Fajar",
    presence: "hadir",
    wish: "Alhamdulillah, selamat berkhitan ya Arga kasep! Semoga lekas sembuh, tambah pintar sekolahnya, dan menjadi kebanggaan keluarga ayah dan ibu ya.",
    createdAt: new Date(Date.now() - 12 * 3600 * 1000).toISOString(), // 12 hours ago
    likes: 2,
    replies: [
      { id: "r1", name: "Ibu Arga", text: "Aamiin ya rabbal alamin.. Terimakasih tante Ria & om Fajar doa baiknya.", createdAt: new Date(Date.now() - 10 * 3600 * 1000).toISOString() }
    ]
  },
  {
    id: "3",
    name: "Pakde Budi & Keluarga",
    presence: "hadir",
    wish: "Selamat ya dek Arga, semoga dilancarkan rangkaian acaranya dari hari pertama sampai selesai. Semoga kelak Arga menjadi pemuda muslim yang tangguh dan cerdas.",
    createdAt: new Date(Date.now() - 1 * 24 * 3600 * 1000).toISOString(), // 1 day ago
    likes: 1,
    replies: []
  },
  {
    id: "4",
    name: "Beni & Heru (Teman Sekelas Arga)",
    presence: "hadir",
    wish: "Selamat khitan Arga! Semoga cepet sembuh biar kita bisa main bola lagi bareng di sekolah. Selamat liburan juga ya Ar!",
    createdAt: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(), // 2 days ago
    likes: 0,
    replies: []
  }
];

if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(initialRsvps, null, 2), 'utf-8');
}

// Middlewares
app.use(express.json());

// API routes
app.get('/api/rsvps', (req, res) => {
  try {
    const fileContent = fs.readFileSync(DATA_FILE, 'utf-8');
    const rsvps = JSON.parse(fileContent);
    // Sort descending by createdAt
    const sorted = rsvps.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    res.json({ success: true, data: sorted });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/rsvps', (req, res) => {
  try {
    const { name, presence, wish } = req.body;
    if (!name || !presence || !wish) {
      return res.status(400).json({ success: false, error: 'Name, presence, and wish are required fields' });
    }

    const fileContent = fs.readFileSync(DATA_FILE, 'utf-8');
    const rsvps = JSON.parse(fileContent);

    const newRsvp = {
      id: Math.random().toString(36).substring(2, 11),
      name,
      presence,
      wish,
      createdAt: new Date().toISOString(),
      likes: 0,
      replies: []
    };

    rsvps.push(newRsvp);
    fs.writeFileSync(DATA_FILE, JSON.stringify(rsvps, null, 2), 'utf-8');

    res.json({ success: true, data: newRsvp });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update RSVP endpoint (for user self-edit)
app.put('/api/rsvps/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { name, presence, wish } = req.body;

    if (!fs.existsSync(DATA_FILE)) {
      return res.status(404).json({ success: false, error: 'Data not found' });
    }

    const fileContent = fs.readFileSync(DATA_FILE, 'utf-8');
    const rsvps = JSON.parse(fileContent);
    const index = rsvps.findIndex((r: any) => r.id === id);

    if (index === -1) {
      return res.status(404).json({ success: false, error: 'RSVP not found' });
    }

    // Update fields
    if (name) rsvps[index].name = name.trim();
    if (presence) rsvps[index].presence = presence;
    if (wish) rsvps[index].wish = wish.trim();
    rsvps[index].updatedAt = new Date().toISOString();

    fs.writeFileSync(DATA_FILE, JSON.stringify(rsvps, null, 2), 'utf-8');
    res.json({ success: true, data: rsvps[index] });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete RSVP endpoint (for owner self-delete)
app.delete('/api/rsvps/:id', (req, res) => {
  try {
    const { id } = req.params;
    const isOwner = req.headers['x-is-owner'] === 'true'; // Checked via local storage matching id

    if (!isOwner) {
      return res.status(403).json({ success: false, error: 'Unauthorized to delete this' });
    }

    if (!fs.existsSync(DATA_FILE)) {
      return res.status(404).json({ success: false, error: 'Data not found' });
    }

    const fileContent = fs.readFileSync(DATA_FILE, 'utf-8');
    const rsvps = JSON.parse(fileContent);
    const filtered = rsvps.filter((r: any) => r.id !== id);

    if (rsvps.length === filtered.length) {
      return res.status(404).json({ success: false, error: 'RSVP not found' });
    }

    fs.writeFileSync(DATA_FILE, JSON.stringify(filtered, null, 2), 'utf-8');
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Like/Unlike RSVP endpoint
app.post('/api/rsvps/:id/like', (req, res) => {
  try {
    const { id } = req.params;
    const { action } = req.body || {}; // 'like' or 'unlike'

    if (!fs.existsSync(DATA_FILE)) {
      return res.status(404).json({ success: false, error: 'Data not found' });
    }

    const fileContent = fs.readFileSync(DATA_FILE, 'utf-8');
    const rsvps = JSON.parse(fileContent);
    const index = rsvps.findIndex((r: any) => r.id === id);

    if (index === -1) {
      return res.status(404).json({ success: false, error: 'RSVP not found' });
    }

    if (action === 'unlike') {
      rsvps[index].likes = Math.max(0, (rsvps[index].likes || 0) - 1);
    } else {
      rsvps[index].likes = (rsvps[index].likes || 0) + 1;
    }

    fs.writeFileSync(DATA_FILE, JSON.stringify(rsvps, null, 2), 'utf-8');
    res.json({ success: true, data: { likes: rsvps[index].likes } });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Reply RSVP endpoint
app.post('/api/rsvps/:id/reply', (req, res) => {
  try {
    const { id } = req.params;
    const { name, text, replyToName } = req.body;

    if (!name || !text) {
      return res.status(400).json({ success: false, error: 'Name and text are required' });
    }

    if (!fs.existsSync(DATA_FILE)) {
      return res.status(404).json({ success: false, error: 'Data not found' });
    }

    const fileContent = fs.readFileSync(DATA_FILE, 'utf-8');
    const rsvps = JSON.parse(fileContent);
    const index = rsvps.findIndex((r: any) => r.id === id);

    if (index === -1) {
      return res.status(404).json({ success: false, error: 'RSVP not found' });
    }

    const newReply = {
      id: Math.random().toString(36).substring(2, 11),
      name: name.trim(),
      text: text.trim(),
      createdAt: new Date().toISOString(),
      ...(replyToName ? { replyToName: replyToName.trim() } : {})
    };

    if (!rsvps[index].replies) rsvps[index].replies = [];
    rsvps[index].replies.push(newReply);

    fs.writeFileSync(DATA_FILE, JSON.stringify(rsvps, null, 2), 'utf-8');
    res.json({ success: true, data: newReply });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Edit Reply endpoint
app.put('/api/rsvps/:rsvpId/reply/:replyId', (req, res) => {
  try {
    const { rsvpId, replyId } = req.params;
    const { name, text } = req.body;

    if (!fs.existsSync(DATA_FILE)) {
      return res.status(404).json({ success: false, error: 'Data not found' });
    }

    const fileContent = fs.readFileSync(DATA_FILE, 'utf-8');
    const rsvps = JSON.parse(fileContent);
    const rsvpIndex = rsvps.findIndex((r: any) => r.id === rsvpId);

    if (rsvpIndex === -1) {
      return res.status(404).json({ success: false, error: 'RSVP not found' });
    }

    const replies = rsvps[rsvpIndex].replies || [];
    const replyIndex = replies.findIndex((rep: any) => rep.id === replyId);

    if (replyIndex === -1) {
      return res.status(404).json({ success: false, error: 'Reply not found' });
    }

    if (name) rsvps[rsvpIndex].replies[replyIndex].name = name.trim();
    if (text) rsvps[rsvpIndex].replies[replyIndex].text = text.trim();
    rsvps[rsvpIndex].replies[replyIndex].updatedAt = new Date().toISOString();

    fs.writeFileSync(DATA_FILE, JSON.stringify(rsvps, null, 2), 'utf-8');
    res.json({ success: true, data: rsvps[rsvpIndex].replies[replyIndex] });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete Reply endpoint
app.delete('/api/rsvps/:rsvpId/reply/:replyId', (req, res) => {
  try {
    const { rsvpId, replyId } = req.params;

    if (!fs.existsSync(DATA_FILE)) {
      return res.status(404).json({ success: false, error: 'Data not found' });
    }

    const fileContent = fs.readFileSync(DATA_FILE, 'utf-8');
    const rsvps = JSON.parse(fileContent);
    const rsvpIndex = rsvps.findIndex((r: any) => r.id === rsvpId);

    if (rsvpIndex === -1) {
      return res.status(404).json({ success: false, error: 'RSVP not found' });
    }

    const replies = rsvps[rsvpIndex].replies || [];
    const filteredReplies = replies.filter((rep: any) => rep.id !== replyId);

    rsvps[rsvpIndex].replies = filteredReplies;

    fs.writeFileSync(DATA_FILE, JSON.stringify(rsvps, null, 2), 'utf-8');
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

async function startServer() {
  // Vite integration
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log("Vite dev server middleware mounted.");
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log("Production static build serving from dist/ mounted.");
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
