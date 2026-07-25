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
import APIs from "../../Main/apis_data/APIs";
import { useAuth } from "../../Authentications/AuthContext";
import { canDeleteRecords } from "../../Authentications/accessControl";
import "./SiteNavigation.css";

axios.defaults.withCredentials = true;

const emptyForm = {
  label: "",
  path: "",
  icon_key: "link",
  sort_order: 0,
  is_enabled: true,
  is_highlighted: false,
  open_new_tab: false,
};

const iconOptions = [
  "home",
  "verified",
  "apartment",
  "groups",
  "school",
  "person",
  "description",
  "business",
  "work",
  "drafts",
  "link",
];

export default function SiteNavigation() {
  const user = useAuth();
  const canDelete = canDeleteRecords(user?.role);
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadItems = async () => {
    try {
      const response = await axios.get(APIs.site_apis.admin_navbar);
      setItems(response.data || []);
    } catch (loadError) {
      setError(loadError.response?.data?.message || "Unable to load navigation items");
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const updateField = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    try {
      if (editingId) {
        await axios.put(`${APIs.site_apis.admin_navbar}/${editingId}`, form);
        setMessage("Navigation item updated");
      } else {
        await axios.post(APIs.site_apis.admin_navbar, form);
        setMessage("Navigation item created");
      }
      resetForm();
      loadItems();
    } catch (submitError) {
      setError(submitError.response?.data?.error || "Unable to save navigation item");
    }
  };

  const editItem = (item) => {
    setEditingId(item.id);
    setForm({
      label: item.label || "",
      path: item.path || "",
      icon_key: item.icon_key || "link",
      sort_order: item.sort_order || 0,
      is_enabled: Boolean(item.is_enabled),
      is_highlighted: Boolean(item.is_highlighted),
      open_new_tab: Boolean(item.open_new_tab),
    });
  };

  const removeItem = async (item) => {
    if (!window.confirm(`Delete navbar item "${item.label}"?`)) return;
    try {
      await axios.delete(`${APIs.site_apis.admin_navbar}/${item.id}`);
      setMessage("Navigation item deleted");
      loadItems();
    } catch (deleteError) {
      setError(deleteError.response?.data?.error || "Unable to delete navigation item");
    }
  };

  return (
    <div className="site-nav-manager">
      <div className="site-nav-hero">
        <h1>Site Navigation Manager</h1>
        <p>Manage public website navbar links dynamically. Changes appear on JNTU-GV public site through the API.</p>
      </div>

      {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <div className="site-nav-grid">
        <Paper className="site-nav-card" elevation={0}>
          <h2>{editingId ? "Edit Navbar Item" : "Add Navbar Item"}</h2>
          <form className="site-nav-form" onSubmit={submit}>
            <TextField label="Label" name="label" value={form.label} onChange={updateField} required fullWidth />
            <TextField label="Path / URL" name="path" value={form.path} onChange={updateField} required fullWidth />
            <div className="site-nav-form-row">
              <TextField select label="Icon" name="icon_key" value={form.icon_key} onChange={updateField} fullWidth>
                {iconOptions.map((icon) => (
                  <MenuItem key={icon} value={icon}>{icon}</MenuItem>
                ))}
              </TextField>
              <TextField label="Sort Order" name="sort_order" type="number" value={form.sort_order} onChange={updateField} fullWidth />
            </div>
            <div className="site-nav-switches">
              <FormControlLabel control={<Checkbox name="is_enabled" checked={form.is_enabled} onChange={updateField} />} label="Show in navbar" />
              <FormControlLabel control={<Checkbox name="is_highlighted" checked={form.is_highlighted} onChange={updateField} />} label="Highlight item" />
              <FormControlLabel control={<Checkbox name="open_new_tab" checked={form.open_new_tab} onChange={updateField} />} label="Open in new tab" />
            </div>
            <div className="site-nav-actions">
              <Button type="submit" variant="contained">{editingId ? "Update" : "Create"}</Button>
              {editingId && <Button type="button" variant="outlined" onClick={resetForm}>Cancel</Button>}
            </div>
          </form>
        </Paper>

        <Paper className="site-nav-card" elevation={0}>
          <h2>Current Navbar Items</h2>
          <div className="site-nav-table-wrap">
            <TableContainer component={Paper} variant="outlined">
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Order</TableCell>
                    <TableCell>Label</TableCell>
                    <TableCell>Path</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.sort_order}</TableCell>
                      <TableCell>{item.label}</TableCell>
                      <TableCell>{item.path}</TableCell>
                      <TableCell>{item.is_enabled ? "Visible" : "Hidden"}{item.is_highlighted ? " / Highlighted" : ""}</TableCell>
                      <TableCell>
                        <div className="site-nav-actions">
                          <Button size="small" variant="outlined" onClick={() => editItem(item)}>Edit</Button>
                          {canDelete && <Button size="small" color="error" variant="outlined" onClick={() => removeItem(item)}>Delete</Button>}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {!items.length && (
                    <TableRow>
                      <TableCell colSpan={5}>No navbar items found.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Paper>
      </div>
    </div>
  );
}
