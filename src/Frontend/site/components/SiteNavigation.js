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
import { Link as RouterLink } from "react-router-dom";
import APIs from "../../Main/apis_data/APIs";
import { useAuth } from "../../Authentications/AuthContext";
import { canDeleteRecords } from "../../Authentications/accessControl";
import "./SiteNavigation.css";

axios.defaults.withCredentials = true;

const emptyForm = {
  label: "",
  path: "",
  reference_key: "",
  cms_section: "static_page",
  icon_key: "link",
  parent_id: "",
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
  "celebration",
  "business",
  "work",
  "drafts",
  "link",
];

const cmsSectionOptions = [
  { value: "static_page", label: "Static Page", consolePath: "" },
  { value: "dropdown", label: "Dropdown Parent", consolePath: "site-navigation" },
  { value: "notification_console", label: "Notifications", consolePath: "notification-console" },
  { value: "press_notes", label: "Press Notes", consolePath: "news-console" },
  { value: "gallery", label: "Gallery", consolePath: "gallery-console" },
  { value: "event_gallery", label: "Event Gallery", consolePath: "event-gallery-console" },
  { value: "carousel", label: "Carousel", consolePath: "carousel-console" },
  { value: "youtube", label: "YouTube", consolePath: "youtube-console" },
  { value: "colleges", label: "Colleges", consolePath: "colleges-console" },
  { value: "directors", label: "Directors", consolePath: "directors" },
  { value: "professionals", label: "Professional Profiles", consolePath: "profile" },
  { value: "document", label: "Document", consolePath: "notification-console" },
  { value: "external", label: "External System", consolePath: "" },
];

const cmsSectionByValue = new Map(cmsSectionOptions.map((option) => [option.value, option]));

const isBrowserLink = (path = "") =>
  /^https?:\/\//i.test(path) || /\.(pdf|docx?|xlsx?|pptx?)($|[?#])/i.test(path);

const getLinkType = (item = {}) => {
  if (item.children?.length) return "Dropdown";
  if (/\.(pdf|docx?|xlsx?|pptx?)($|[?#])/i.test(item.path || "")) return "Document";
  if (/^https?:\/\//i.test(item.path || "")) return "External";
  return "Page";
};

const slugifyReference = (value = "") =>
  String(value || "")
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);

const buildReferenceKey = (label = "", path = "") =>
  `nav.${slugifyReference(path && path !== "/" ? path : label) || "item"}`;

const inferCmsSection = (path = "", parentId = "") => {
  if (parentId) return "dropdown";
  if (/^https?:\/\//i.test(path)) return "external";
  if (/\.(pdf|docx?|xlsx?|pptx?)($|[?#])/i.test(path)) return "document";
  if (/press-notes|news/i.test(path)) return "press_notes";
  if (/gallery/i.test(path)) return "gallery";
  if (/youtube/i.test(path)) return "youtube";
  if (/college/i.test(path)) return "colleges";
  if (/director/i.test(path)) return "professionals";
  if (/notification|recruitment|examination|academic/i.test(path)) return "notification_console";
  return "static_page";
};

const buildNavTree = (navItems = []) => {
  const byId = new Map(navItems.map((item) => [item.id, { ...item, children: [] }]));
  const topLevel = [];

  navItems.forEach((item) => {
    const current = byId.get(item.id);
    if (item.parent_id && byId.has(item.parent_id)) {
      byId.get(item.parent_id).children.push(current);
    } else {
      topLevel.push(current);
    }
  });

  const sortRows = (rows) =>
    rows
      .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0) || a.id - b.id)
      .map((row) => ({ ...row, children: sortRows(row.children || []) }));

  return sortRows(topLevel);
};

const flattenTree = (rows = [], level = 0, parentLabel = "Top level") =>
  rows.flatMap((row) => [
    { ...row, level, parentLabel },
    ...flattenTree(row.children || [], level + 1, row.label),
  ]);

export default function SiteNavigation() {
  const user = useAuth();
  const canDelete = canDeleteRecords(user?.role);
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navTree = buildNavTree(items);
  const tableRows = flattenTree(navTree);
  const parentOptions = items
    .filter((item) => item.id !== editingId && !item.parent_id)
    .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0) || a.id - b.id);

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
      ...(name === "label" && !current.reference_key
        ? { reference_key: buildReferenceKey(value, current.path) }
        : {}),
      ...(name === "path" && !current.reference_key
        ? { reference_key: buildReferenceKey(current.label, value) }
        : {}),
      ...(name === "path" && current.cms_section === "static_page"
        ? { cms_section: inferCmsSection(value, current.parent_id) }
        : {}),
      ...(name === "parent_id" && value && current.cms_section === "static_page"
        ? { cms_section: "dropdown" }
        : {}),
      ...(name === "path" && isBrowserLink(value) ? { open_new_tab: true } : {}),
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
      const payload = {
        ...form,
        reference_key: form.reference_key || buildReferenceKey(form.label, form.path),
        cms_section: form.cms_section || inferCmsSection(form.path, form.parent_id),
        parent_id: form.parent_id || null,
        sort_order: Number.parseInt(form.sort_order, 10) || 0,
        open_new_tab: Boolean(form.open_new_tab) || isBrowserLink(form.path),
      };

      if (editingId) {
        await axios.put(`${APIs.site_apis.admin_navbar}/${editingId}`, payload);
        setMessage("Navigation item updated");
      } else {
        await axios.post(APIs.site_apis.admin_navbar, payload);
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
      reference_key: item.reference_key || buildReferenceKey(item.label, item.path),
      cms_section: item.cms_section || inferCmsSection(item.path, item.parent_id),
      icon_key: item.icon_key || "link",
      sort_order: item.sort_order || 0,
      parent_id: item.parent_id || "",
      is_enabled: Boolean(item.is_enabled),
      is_highlighted: Boolean(item.is_highlighted),
      open_new_tab: Boolean(item.open_new_tab) || isBrowserLink(item.path),
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
      <div className="site-nav-heading">
        <div>
          <p>Website CMS</p>
          <h1>Navigation Manager</h1>
        </div>
        <span>{items.length} menu items</span>
      </div>

      {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <div className="site-nav-grid">
        <Paper className="site-nav-card" elevation={0}>
          <div className="site-nav-card-title">
            <h2>{editingId ? "Edit Navbar Item" : "Add Navbar Item"}</h2>
            <p>Manage the exact public route, dropdown parent, CMS target, reference key, and visibility state.</p>
          </div>
          <form className="site-nav-form" onSubmit={submit}>
            <TextField label="Label" name="label" value={form.label} onChange={updateField} required fullWidth />
            <TextField
              label="Path / URL"
              name="path"
              value={form.path}
              onChange={updateField}
              helperText="Use website paths like /about-us or full URLs/PDF paths for browser links."
              required
              fullWidth
            />
            <TextField
              label="Reference Key"
              name="reference_key"
              value={form.reference_key}
              onChange={updateField}
              helperText="Stable CMS key used to identify the page/link even if the title changes."
              fullWidth
            />
            <TextField
              select
              label="CMS Target"
              name="cms_section"
              value={form.cms_section}
              onChange={updateField}
              helperText="Select the admin console that owns or updates this link's content."
              fullWidth
            >
              {cmsSectionOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Parent Menu"
              name="parent_id"
              value={form.parent_id}
              onChange={updateField}
              fullWidth
            >
              <MenuItem value="">Top-level menu item</MenuItem>
              {parentOptions.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.label}
                </MenuItem>
              ))}
            </TextField>
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
          <div className="site-nav-card-title">
            <h2>Current Navbar Items</h2>
            <p>Child rows become dropdown links on the public website.</p>
          </div>
          <div className="site-nav-preview" aria-label="Navigation preview">
            {navTree.map((item) => (
              <div key={item.id} className="site-nav-preview-item">
                <span>{item.label}</span>
                {item.children?.length ? <small>{item.children.length}</small> : null}
              </div>
            ))}
          </div>
          <div className="site-nav-table-wrap">
            <TableContainer component={Paper} variant="outlined">
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Order</TableCell>
                    <TableCell>Label</TableCell>
                    <TableCell>Reference Key</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>CMS Target</TableCell>
                    <TableCell>Parent</TableCell>
                    <TableCell>Path</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableRows.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.sort_order}</TableCell>
                      <TableCell>
                        <span className={`site-nav-label site-nav-level-${Math.min(item.level, 2)}`}>
                          {item.label}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="site-nav-ref">{item.reference_key || buildReferenceKey(item.label, item.path)}</span>
                      </TableCell>
                      <TableCell>
                        <span className={`site-nav-status type-${getLinkType(item).toLowerCase()}`}>
                          {getLinkType(item)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="site-nav-cms-target">
                          <span>{cmsSectionByValue.get(item.cms_section)?.label || item.cms_section || "Static Page"}</span>
                          {cmsSectionByValue.get(item.cms_section)?.consolePath ? (
                            <Button
                              size="small"
                              component={RouterLink}
                              to={`/dashboard/${cmsSectionByValue.get(item.cms_section).consolePath}`}
                              variant="text"
                            >
                              Open CMS
                            </Button>
                          ) : null}
                        </div>
                      </TableCell>
                      <TableCell>{item.parentLabel}</TableCell>
                      <TableCell>
                        <span className="site-nav-path">{item.path}</span>
                      </TableCell>
                      <TableCell>
                        <span className={item.is_enabled ? "site-nav-status visible" : "site-nav-status hidden"}>
                          {item.is_enabled ? "Visible" : "Hidden"}
                        </span>
                        {item.is_highlighted ? <span className="site-nav-status highlighted">Highlighted</span> : null}
                        {item.open_new_tab ? <span className="site-nav-status browser">New tab</span> : null}
                      </TableCell>
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
                      <TableCell colSpan={9}>No navbar items found.</TableCell>
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
