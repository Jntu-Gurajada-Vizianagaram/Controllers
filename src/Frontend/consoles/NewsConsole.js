import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import APIs from "../Main/apis_data/APIs";
import { useAuth } from "../Authentications/AuthContext";
import { canDeleteRecords } from "../Authentications/accessControl";
import { ConsolePage } from "./ConsolePage";
import "./PressNotesConsole.css";

const currentTime = () => new Date().toTimeString().slice(0, 5);
const toDateInputValue = (value = new Date()) => {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const createEmptyForm = () => ({
  release_date: toDateInputValue(),
  release_time: currentTime(),
  title: "",
  body_text: "",
  is_published: true,
});

const formatDisplayDate = (value) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return { date: "", day: "" };
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return {
    date: `${day}-${month}-${year}`,
    day: date.toLocaleDateString("en-IN", { weekday: "long" }),
  };
};

export default function NewsConsole() {
  const user = useAuth();
  const canDelete = canDeleteRecords(user?.role);
  const [pressNotes, setPressNotes] = useState([]);
  const [form, setForm] = useState(createEmptyForm);
  const [image, setImage] = useState(null);
  const [sourceFile, setSourceFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [extracting, setExtracting] = useState(false);

  const sortedNotes = useMemo(() => pressNotes || [], [pressNotes]);

  const loadPressNotes = async () => {
    try {
      const response = await axios.get(APIs.press_notes_apis.admin_press_notes);
      setPressNotes(response.data || []);
    } catch (loadError) {
      setError(loadError.response?.data?.error || "Unable to load press notes");
    }
  };

  useEffect(() => {
    loadPressNotes();
  }, []);

  const updateField = (event) => {
    const { name, value, checked, type } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const resetForm = () => {
    setForm(createEmptyForm());
    setImage(null);
    setSourceFile(null);
    setEditingId(null);
  };

  const extractSourceText = async (file) => {
    if (!file) return;
    setSourceFile(file);
    setExtracting(true);
    setError("");

    const payload = new FormData();
    payload.append("source_file", file);

    try {
      const response = await axios.post(`${APIs.press_notes_apis.admin_press_notes}/extract-text`, payload);
      const extractedText = response.data?.extracted_text || "";
      setForm((current) => ({
        ...current,
        body_text: extractedText || current.body_text,
      }));
      setMessage(extractedText ? "Text extracted from document. Please review before saving." : "Document uploaded, but no text could be extracted.");
    } catch (extractError) {
      setError(extractError.response?.data?.error || "Unable to extract text from document");
    } finally {
      setExtracting(false);
    }
  };

  const submit = async (event) => {
    event.preventDefault();
    setMessage("");
    setError("");

    const payload = new FormData();
    Object.entries(form).forEach(([key, value]) => payload.append(key, value));
    if (image) payload.append("image", image);
    if (sourceFile) payload.append("source_file", sourceFile);

    try {
      if (editingId) {
        await axios.put(`${APIs.press_notes_apis.admin_press_notes}/${editingId}`, payload);
        setMessage("Press note updated successfully");
      } else {
        await axios.post(APIs.press_notes_apis.admin_press_notes, payload);
        setMessage("Press note created successfully");
      }
      resetForm();
      loadPressNotes();
    } catch (submitError) {
      setError(submitError.response?.data?.error || "Unable to save press note");
    }
  };

  const edit = (note) => {
    setEditingId(note.id);
    setForm({
      release_date: toDateInputValue(note.release_date),
      release_time: String(note.release_time || "").slice(0, 5),
      title: note.title || "",
      body_text: note.body_text || "",
      is_published: Boolean(note.is_published),
    });
    setImage(null);
    setSourceFile(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const remove = async (note) => {
    if (!window.confirm(`Delete press note "${note.title}"?`)) return;
    try {
      await axios.delete(`${APIs.press_notes_apis.admin_press_notes}/${note.id}`);
      setMessage("Press note deleted");
      loadPressNotes();
    } catch (deleteError) {
      setError(deleteError.response?.data?.error || "Unable to delete press note");
    }
  };

  return (
    <ConsolePage
      title="Press Notes Console"
      description="Create Press Notes with release date/time, title, one image, extracted Word/PDF text, and pasted text with line breaks."
    >
      {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Paper component="form" onSubmit={submit} variant="outlined" className="press-note-form">
        <Box className="press-note-grid">
          <TextField
            label="Press Note Release Date"
            name="release_date"
            type="date"
            value={form.release_date}
            onChange={updateField}
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            label="Press Note Release Time"
            name="release_time"
            type="time"
            value={form.release_time}
            onChange={updateField}
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            label="Press Note Title"
            name="title"
            value={form.title}
            onChange={updateField}
            required
          />
        </Box>

        <Box className="press-note-upload-row">
          <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
            {image ? image.name : editingId ? "Replace Image" : "Upload One Image"}
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.webp,.gif"
              hidden
              onChange={(event) => setImage(event.target.files?.[0] || null)}
            />
          </Button>
          <Button component="label" variant="outlined" startIcon={<CloudUploadIcon />}>
            {extracting ? "Extracting text..." : sourceFile ? sourceFile.name : "Upload Word/PDF for Text Extraction"}
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              hidden
              onChange={(event) => extractSourceText(event.target.files?.[0] || null)}
            />
          </Button>
          <FormControlLabel
            control={<Checkbox checked={form.is_published} name="is_published" onChange={updateField} />}
            label="Publish on public site"
          />
        </Box>

        <TextField
          label="Press Note Text / Paste Extracted Text Here"
          name="body_text"
          value={form.body_text}
          onChange={updateField}
          multiline
          minRows={10}
          fullWidth
          helperText="Line breaks are preserved. Upload a Word/PDF to auto-fill this field, then review or edit before saving."
        />

        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ mt: 2 }}>
          <Button type="submit" variant="contained">
            {editingId ? "Update Press Note" : "Create Press Note"}
          </Button>
          {editingId && <Button variant="outlined" onClick={resetForm}>Cancel Edit</Button>}
        </Stack>
      </Paper>

      <Box className="press-note-list">
        <Typography variant="h5" className="press-note-section-title">Press Note Records</Typography>
        {sortedNotes.length === 0 ? (
          <Paper variant="outlined" className="press-note-empty">No press notes created yet.</Paper>
        ) : (
          sortedNotes.map((note) => {
            const displayDate = formatDisplayDate(note.release_date);
            return (
            <Paper key={note.id} variant="outlined" className="press-note-record">
              <Box className="press-note-image-wrap">
                {note.image_link ? (
                  <img src={note.image_link} alt={note.title} loading="lazy" decoding="async" />
                ) : (
                  <span>No image</span>
                )}
              </Box>
              <Box className="press-note-content">
                <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" spacing={1}>
                  <Box>
                    <Typography variant="h6" className="press-note-title">{note.title}</Typography>
                    <Typography variant="caption" className="press-note-meta">
                      Release: {displayDate.date} {displayDate.day ? `(${displayDate.day})` : ""} at {String(note.release_time || "").slice(0, 5)}
                      {note.is_published ? " - Published" : " - Draft"}
                    </Typography>
                  </Box>
                  <Stack direction="row" spacing={1}>
                    <Button size="small" variant="contained" startIcon={<EditIcon />} onClick={() => edit(note)}>
                      Edit
                    </Button>
                    {canDelete && (
                      <Button size="small" variant="contained" color="error" startIcon={<DeleteIcon />} onClick={() => remove(note)}>
                        Delete
                      </Button>
                    )}
                  </Stack>
                </Stack>
                {note.source_file_link && (
                  <a href={note.source_file_link} target="_blank" rel="noopener noreferrer" className="press-note-source-link">
                    View uploaded source document
                  </a>
                )}
                <Typography component="pre" className="press-note-body">
                  {note.body_text}
                </Typography>
              </Box>
            </Paper>
          );
          })
        )}
      </Box>
    </ConsolePage>
  );
}
