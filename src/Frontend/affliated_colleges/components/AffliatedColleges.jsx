import {
  Button,
  InputBase,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FaExternalLinkAlt, FaPen, FaTrash } from 'react-icons/fa';
import { canDeleteRecords } from '../../Authentications/accessControl';
import { useAuth } from '../../Authentications/AuthContext';
import api from '../../Main/apis_data/APIs';
import '../css/AffliatedColleges.css';
import EDIT from './EditCollege';

const statusFilters = ['All', 'Affiliated', 'Autonomous', 'University'];

const getStatusClass = (status = '') =>
  `college-status-pill status-${String(status || 'Affiliated').trim().toLowerCase()}`;

const Affliated_colleges = () => {
  const user = useAuth();
  const canDelete = canDeleteRecords(user?.role);
  const [collegeData, setCollegeData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedCollege, setSelectedCollege] = useState(null);

  const fetchCollegeData = useCallback(async () => {
    try {
      const response = await fetch(api.affliated_colleges_apis.all_colleges, { credentials: 'include' });
      const data = await response.json();
      setCollegeData(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching college data:', error);
    }
  }, []);

  useEffect(() => {
    fetchCollegeData();
  }, [fetchCollegeData]);

  const searchResults = useMemo(() => {
    const value = searchTerm.toLowerCase();
    return collegeData.filter((college) => {
      const status = college.college_status || college.status || 'Affiliated';
      const matchesStatus = statusFilter === 'All' || status === statusFilter;
      const matchesSearch = [
        college.college_code,
        college.college_name,
        college.district,
        college.affiliation_type,
        college.college_type,
        status,
        college.academic_year,
        college.autonomous_year,
        college.principal_name,
        college.principal_email,
        college.principal_phone,
      ]
        .filter(Boolean)
        .some((field) => String(field).toLowerCase().includes(value));
      return matchesStatus && matchesSearch;
    });
  }, [collegeData, searchTerm, statusFilter]);

  const statusCounts = useMemo(
    () =>
      collegeData.reduce(
        (counts, college) => {
          const status = college.college_status || college.status || 'Affiliated';
          counts.All += 1;
          counts[status] = (counts[status] || 0) + 1;
          return counts;
        },
        { All: 0, Affiliated: 0, Autonomous: 0, University: 0 },
      ),
    [collegeData],
  );

  const handleDeleteClick = async (id) => {
    if (!window.confirm('Delete this college record?')) return;
    try {
      const response = await fetch(`${api.affliated_colleges_apis.remove_college}/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!response.ok) throw new Error(await response.text());
      setCollegeData((current) => current.filter((college) => college.id !== id));
    } catch (error) {
      alert('Error deleting college');
    }
  };

  const closeEdit = () => setSelectedCollege(null);
  const afterEdit = () => {
    closeEdit();
    fetchCollegeData();
  };

  return (
    <div className="main_div college-console-page">
      {selectedCollege && (
        <EDIT college={selectedCollege} onCancel={closeEdit} onSaved={afterEdit} />
      )}

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={1.5} alignItems={{ xs: 'stretch', md: 'center' }} justifyContent="space-between" className="college-console-toolbar">
        <div>
          <Typography variant="h6">Colleges List</Typography>
          <Typography variant="body2" color="text.secondary">Manage year-wise college records, status, affiliation type, website, and public visibility.</Typography>
        </div>
        <Paper component="form" className="college-console-search" onSubmit={(event) => event.preventDefault()}>
          <InputBase
            placeholder="Search by name, code, district, status..."
            fullWidth
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </Paper>
      </Stack>

      <div className="college-console-statusbar" aria-label="College status filters">
        {statusFilters.map((status) => (
          <button
            key={status}
            type="button"
            className={statusFilter === status ? 'active' : ''}
            onClick={() => setStatusFilter(status)}
          >
            <span>{status}</span>
            <strong>{statusCounts[status] || 0}</strong>
          </button>
        ))}
      </div>

      <TableContainer component={Paper} className="college-console-table-wrap">
        <Table size="small" className="college-console-table">
          <TableHead>
            <TableRow>
              <TableCell className="college-col-serial">S.No</TableCell>
              <TableCell className="college-col-code">Code</TableCell>
              <TableCell className="college-col-logo">Logo</TableCell>
              <TableCell>College Name</TableCell>
              <TableCell>District</TableCell>
              <TableCell>Academic Info</TableCell>
              <TableCell>Principal Office</TableCell>
              <TableCell>Promote</TableCell>
              <TableCell className="college-col-action">Website</TableCell>
              <TableCell className="college-col-action">Edit</TableCell>
              {canDelete && <TableCell className="college-col-action">Delete</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {searchResults.map((college, index) => (
              <TableRow key={college.id || college.college_code}>
                <TableCell className="college-col-serial">{index + 1}</TableCell>
                <TableCell className="college-code-cell">{college.college_code}</TableCell>
                <TableCell>
                  {college.logo ? (
                    <img src={college.logo} width="42" height="42" alt={`${college.college_name} logo`} className="college-logo-thumb" />
                  ) : (
                    <span className="college-logo-empty">No logo</span>
                  )}
                </TableCell>
                <TableCell className="college-name-cell">{college.college_name}</TableCell>
                <TableCell>{college.district || college.college_address}</TableCell>
                <TableCell>
                  <div className="college-meta-stack">
                    <span className={getStatusClass(college.college_status || college.status)}>
                      {college.college_status || college.status || 'Affiliated'}
                    </span>
                    <span>{college.college_type || '-'}</span>
                    <span>{college.affiliation_type || 'Temporary'}</span>
                    <span>Year: {college.academic_year || '2026-27'}</span>
                    <span>Autonomous: {college.autonomous_year || college.autonomousYear || '-'}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="college-principal-cell">
                    <strong>{college.principal_name || college.principalName || college.PrincipalName || 'Not updated'}</strong>
                    {(college.principal_email || college.principalEmail || college.Email) && (
                      <a href={`mailto:${college.principal_email || college.principalEmail || college.Email}`}>
                        {college.principal_email || college.principalEmail || college.Email}
                      </a>
                    )}
                    {(college.principal_phone || college.principalPhone || college.Phone) && (
                      <span>{college.principal_phone || college.principalPhone || college.Phone}</span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <span className={college.promote_to_university || college.promoteToUniversity ? 'college-boolean yes' : 'college-boolean no'}>
                    {college.promote_to_university || college.promoteToUniversity ? 'Yes' : 'No'}
                  </span>
                </TableCell>
                <TableCell>
                  {college.college_link ? (
                    <Button className="college-row-button" size="small" variant="outlined" href={college.college_link} target="_blank" rel="noopener noreferrer" startIcon={<FaExternalLinkAlt />}>Visit</Button>
                  ) : 'N/A'}
                </TableCell>
                <TableCell>
                  <Button className="college-row-button" size="small" variant="outlined" onClick={() => setSelectedCollege(college)} startIcon={<FaPen />}>Edit</Button>
                </TableCell>
                {canDelete && (
                  <TableCell>
                    <Button className="college-row-button danger" size="small" color="error" variant="outlined" onClick={() => handleDeleteClick(college.id)} startIcon={<FaTrash />}>Delete</Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
            {!searchResults.length && (
              <TableRow>
                <TableCell colSpan={canDelete ? 11 : 10} align="center" className="college-empty-cell">
                  No college records found for the selected filter.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Affliated_colleges;
