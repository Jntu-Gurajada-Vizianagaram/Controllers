import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Alert,
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import APIs from "../Main/apis_data/APIs";
import { useAuth } from "../Authentications/AuthContext";
import { canDeleteRecords } from "../Authentications/accessControl";
import { ConsolePage } from "./ConsolePage";

const emptyForm = {
  video_id: "",
  title: "",
  publisher: "JNTU-GV",
  embed_blocked: false,
  is_active: true,
  sort_order: 0,
};

const extractVideoId = (input) => {
  const value = String(input || "").trim();
  if (!value.includes("youtube") && !value.includes("youtu.be")) return value;
  const patterns = [
    /[?&]v=([^&]+)/,
    /youtu\.be\/([^?&]+)/,
    /embed\/([^?&/]+)/,
    /live\/([^?&/]+)/,
  ];
  for (const pattern of patterns) {
    const match = value.match(pattern);
    if (match?.[1]) return match[1];
  }
  return value;
};

export default function YoutubeConsole() {
  const user = useAuth();
  const canDelete = canDeleteRecords(user?.role);
  const [videos, setVideos] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadVideos = async () => {
    try {
      const response = await axios.get(APIs.site_apis.admin_youtube_videos);
      setVideos(response.data || []);
    } catch (loadError) {
      setError(loadError.response?.data?.error || "Unable to load YouTube videos");
    }
  };

  useEffect(() => {
    loadVideos();
  }, []);

  const updateField = (event) => {
    const { name, value, checked, type } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const reset = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const submit = async (event) => {
    event.preventDefault();
    setMessage("");
    setError("");
    const payload = { ...form, video_id: extractVideoId(form.video_id) };
    try {
      if (editingId) {
        await axios.put(`${APIs.site_apis.admin_youtube_videos}/${editingId}`, payload);
        setMessage("YouTube video updated");
      } else {
        await axios.post(APIs.site_apis.admin_youtube_videos, payload);
        setMessage("YouTube video added");
      }
      reset();
      loadVideos();
    } catch (submitError) {
      setError(submitError.response?.data?.error || "Unable to save YouTube video");
    }
  };

  const edit = (video) => {
    setEditingId(video.row_id);
    setForm({
      video_id: video.id,
      title: video.title,
      publisher: video.publisher || "JNTU-GV",
      embed_blocked: Boolean(video.embedBlocked),
      is_active: Boolean(video.isActive),
      sort_order: video.sortOrder || 0,
    });
  };

  const remove = async (video) => {
    if (!window.confirm(`Delete video "${video.title}"?`)) return;
    try {
      await axios.delete(`${APIs.site_apis.admin_youtube_videos}/${video.row_id}`);
      setMessage("YouTube video deleted");
      loadVideos();
    } catch (deleteError) {
      setError(deleteError.response?.data?.error || "Unable to delete YouTube video");
    }
  };

  return (
    <ConsolePage
      title="YouTube Console"
      description="Add YouTube video IDs or URLs once and publish them directly to the public website video section."
    >
      {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Paper component="form" onSubmit={submit} variant="outlined" sx={{ p: 2, mb: 2 }}>
        <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
          <TextField label="YouTube Video ID or URL" name="video_id" value={form.video_id} onChange={updateField} required />
          <TextField label="Title" name="title" value={form.title} onChange={updateField} required />
          <TextField label="Publisher" name="publisher" value={form.publisher} onChange={updateField} />
          <TextField label="Sort Order" name="sort_order" type="number" value={form.sort_order} onChange={updateField} />
          <TextField select label="Embed Status" name="embed_blocked" value={String(form.embed_blocked)} onChange={(e) => setForm((c) => ({ ...c, embed_blocked: e.target.value === "true" }))}>
            <MenuItem value="false">Embeddable</MenuItem>
            <MenuItem value="true">Open on YouTube only</MenuItem>
          </TextField>
        </div>
        <FormControlLabel control={<Checkbox name="is_active" checked={form.is_active} onChange={updateField} />} label="Publish on public site" />
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Button type="submit" variant="contained">{editingId ? "Update Video" : "Add Video"}</Button>
          {editingId && <Button type="button" variant="outlined" onClick={reset}>Cancel</Button>}
        </div>
      </Paper>

      <TableContainer component={Paper} variant="outlined">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Order</TableCell>
              <TableCell>Video</TableCell>
              <TableCell>Publisher</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {videos.map((video) => (
              <TableRow key={video.row_id}>
                <TableCell>{video.sortOrder}</TableCell>
                <TableCell>
                  <strong>{video.title}</strong><br />
                  <a href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noreferrer">{video.id}</a>
                </TableCell>
                <TableCell>{video.publisher}</TableCell>
                <TableCell>{video.isActive ? "Published" : "Hidden"} / {video.embedBlocked ? "External" : "Embeddable"}</TableCell>
                <TableCell>
                  <Button size="small" onClick={() => edit(video)}>Edit</Button>
                  {canDelete && <Button size="small" color="error" onClick={() => remove(video)}>Delete</Button>}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ConsolePage>
  );
}
