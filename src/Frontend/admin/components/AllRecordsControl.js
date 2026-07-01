import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {
  Box,
  Button,
  Chip,
  CircularProgress,
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
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Authentications/AuthContext';
import { canDeleteRecords } from '../../Authentications/accessControl';
import api from '../../Main/apis_data/APIs';
import '../css/ConsoleManagement.css';

const RECENT_NOTIFICATION_COUNT = 10;
const PAGE_SIZE = 25;

const AllRecordsControls = () => {
  const user = useAuth();
  const canDelete = canDeleteRecords(user?.role);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);

  const getUpdateEvents = async (pageIndex = page) => {
    setLoading(true);
    try {
      const offset = RECENT_NOTIFICATION_COUNT + pageIndex * PAGE_SIZE;
      const response = await axios.get(
        `${api.updates_apis.every_event}?limit=${PAGE_SIZE}&offset=${offset}`,
      );
      setRequests(response.data);
    } catch (error) {
      console.error(error);
      alert('Unable to load notification records');
    } finally {
      setLoading(false);
    }
  };

  const deleteNotification = async (request) => {
    if (!canDelete) return;
    if (!window.confirm(`Delete notification: ${request.title}?`)) return;
    try {
      await axios.delete(`${api.updates_apis.remove_event}/${request.id}`);
      getUpdateEvents();
    } catch (error) {
      console.error(error);
      alert('Unable to delete this notification');
    }
  };

  useEffect(() => {
    getUpdateEvents(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <Box className="responsive-console-page records-storage-page">
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, md: 3 },
          mb: 2,
          borderRadius: 4,
          color: '#fff',
          background: 'linear-gradient(135deg, #082044 0%, #0c4a8f 100%)',
        }}
      >
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={2}
          alignItems={{ xs: 'flex-start', md: 'center' }}
          justifyContent="space-between"
        >
          <Box>
            <Typography variant="overline" sx={{ color: 'rgba(255,255,255,.72)', fontWeight: 900 }}>
              Record Storage
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 900 }}>
              Archived Notifications
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,.82)', mt: 1 }}>
              Recent 10 notifications stay in Notification Console. This page loads older records in pages for faster performance.
            </Typography>
          </Box>
          <Chip
            label={`Page ${page + 1}`}
            sx={{ bgcolor: '#fff', color: '#082044', fontWeight: 900 }}
          />
        </Stack>
      </Paper>

      <Box className="console-management-table-area" sx={{ p: 0 }}>
        {loading ? (
          <Box sx={{ minHeight: 260, display: 'grid', placeItems: 'center' }}>
            <Stack spacing={2} alignItems="center">
              <CircularProgress />
              <Typography>Loading notification records...</Typography>
            </Stack>
          </Box>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>S.NO</TableCell>
                  <TableCell>Notification Date</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Added By</TableCell>
                  <TableCell>View File</TableCell>
                  {canDelete && <TableCell>Delete</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {requests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>{request.id}</TableCell>
                    <TableCell>{request.date}</TableCell>
                    <TableCell>{request.title}</TableCell>
                    <TableCell>{request.update_status}</TableCell>
                    <TableCell>{request.submitted_by}</TableCell>
                    <TableCell>
                      {request.file_link ? (
                        <a href={request.file_link} target="_blank" rel="noreferrer">View File</a>
                      ) : request.external_link ? (
                        <a href={request.external_link} target="_blank" rel="noreferrer">Open Link</a>
                      ) : (
                        'No file'
                      )}
                    </TableCell>
                    {canDelete && (
                      <TableCell>
                        <Button
                          variant="contained"
                          color="error"
                          className="danger-action-button"
                          onClick={() => deleteNotification(request)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
                {!requests.length && (
                  <TableRow>
                    <TableCell colSpan={canDelete ? 7 : 6} align="center">
                      No older notification records found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={1.5}
        justifyContent="space-between"
        alignItems={{ xs: 'stretch', sm: 'center' }}
        sx={{ mt: 2 }}
      >
        <Button
          variant="outlined"
          startIcon={<NavigateBeforeIcon />}
          disabled={page === 0 || loading}
          onClick={() => setPage((current) => Math.max(current - 1, 0))}
        >
          Previous
        </Button>
        <Typography align="center" color="text.secondary">
          Showing records {RECENT_NOTIFICATION_COUNT + page * PAGE_SIZE + 1}
          {' '}to {RECENT_NOTIFICATION_COUNT + page * PAGE_SIZE + requests.length}
        </Typography>
        <Button
          variant="contained"
          endIcon={<NavigateNextIcon />}
          disabled={loading || requests.length < PAGE_SIZE}
          onClick={() => setPage((current) => current + 1)}
        >
          Next
        </Button>
      </Stack>
    </Box>
  );
};

export default AllRecordsControls;
