import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import ips from '../../../api.json'; // assuming api.json is in the same directory
import "../../css/Admin.css";
import "../../css/updates.css";

const GalleryImagesRequests = () => {
  const [requests, setRequests] = useState([]);

  // Use environment variables to manage API URLs
  const api_ip = ips.server_ip || 'http://localhost:8888';

  const get_requests = async () => {
    try {
      const response = await axios.get(`${api_ip}/api/webadmin/gallery-requests`);
      setRequests(response.data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  const request_accept = async (request) => {
    try {
      const response = await axios.get(`${api_ip}/api/webadmin/accept-request/${request.id}`);
      alert(response.data.message);
      get_requests();
    } catch (err) {
      console.error('Error accepting request:', err);
    }
  };

  const request_deny = async (request) => {
    try {
      const response = await axios.get(`${api_ip}/api/webadmin/deny-request/${request.id}`);
      alert(response.data.message);
      get_requests();
    } catch (err) {
      console.error('Error denying request:', err);
    }
  };

  useEffect(() => {
    get_requests();
  }, []);

  return (
    <div className="container admin-main">
      <div className="row">
        <div className="col-12 eventsdisplay">
          {requests.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">S.NO</th>
                    <th scope="col">Notification Date</th>
                    <th scope="col">Title</th>
                    <th scope="col">Thumbnail</th>
                    <th scope="col">Update Added By</th>
                    <th scope="col">Photos Count</th>
                    <th scope="col">Accept</th>
                    <th scope="col">Deny</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((request, index) => (
                    <tr key={request.id}>
                      <td>{index + 1}</td>
                      <td>{request.uploaded_date}</td>
                      <td>{request.event_name}</td>
                      <td>
                        <img
                          src={`${api_ip}/uploads/gallery/${request.event_photos[0]}`}
                          alt={`${request.event_name} Thumbnail`}
                          height={70}
                          width={50}
                        />
                      </td>
                      <td>{request.added_by}</td>
                      <td>{request.event_photos.length}</td>
                      <td>
                        <button className="btn btn-success" onClick={() => request_accept(request)}>
                          Accept
                        </button>
                      </td>
                      <td>
                        <button className="btn btn-danger" onClick={() => request_deny(request)}>
                          Deny
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div>
              <h1>No New Requests</h1>
            </div>
          )}
        </div>
      </div>
      <div className="row all-consoles">
        {/* Other components can be included here */}
      </div>
    </div>
  );
};

export default GalleryImagesRequests;
