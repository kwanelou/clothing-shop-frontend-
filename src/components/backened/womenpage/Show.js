import React, { useEffect, useState } from 'react';
import Sidebar from '../../everywhere/Sidebar';
import { Link } from 'react-router-dom';
import { Toast } from 'react-bootstrap';

const Show = () => {
  const [women, setWomen] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const fetchWomen = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userinfo'));
      const token = userInfo?.token;

      const response = await fetch('http://127.0.0.1:8000/api/womens', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      console.log(data);

      if (data.status === true && Array.isArray(data.data)) {
        setWomen(data.data);
      }
    } catch (error) {
      console.log('Error fetching women clothes:', error);
    }
  };

  useEffect(() => {
    fetchWomen();
  }, []);

  const deleteWomen = async (id) => {
    if (!window.confirm('Are you sure you want to delete this women cloth?')) {
      return;
    }

    try {
      const userInfo = JSON.parse(localStorage.getItem('userinfo'));
      const token = userInfo?.token;

      const response = await fetch(
        `http://127.0.0.1:8000/api/womens/${id}`,
        {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      console.log('DELETE RESULT:', result);

      if (result.status) {
        setWomen((prevWomen) =>
          prevWomen.filter((item) => item.id !== id)
        );

        setToastMessage('Women cloth deleted successfully!');
        setShowToast(true);
      } else {
        setToastMessage(result.message || 'Failed to delete women cloth');
        setShowToast(true);
      }
    } catch (error) {
      console.log('DELETE ERROR:', error);
      setToastMessage('Something went wrong while deleting');
      setShowToast(true);
    }
  };

  return (
    <>
      <main>
        <div
          aria-live='polite'
          aria-atomic='true'
          className='position-relative'
        >
          <div
            style={{
              position: 'fixed',
              top: 20,
              right: 20,
              zIndex: 9999,
            }}
          >
            <Toast
              onClose={() => setShowToast(false)}
              show={showToast}
              delay={2000}
              autohide
              bg={
                toastMessage.toLowerCase().includes('success')
                  ? 'success'
                  : 'danger'
              }
            >
              <Toast.Header>
                <strong className='me-auto'>Notification</strong>
              </Toast.Header>

              <Toast.Body className='text-white'>
                {toastMessage}
              </Toast.Body>
            </Toast>
          </div>
        </div>

        <div className='container my-5'>
          <div className='row'>
            <div className='col-md-3'>
              <div className='card shadow border-0'>
                <div className='card-body'>
                  <Sidebar />
                </div>
              </div>
            </div>

            <div className='col-md-9'>
              <div className='card shadow border-0'>
                <div className='card-body p-4'>
                  <div className='d-flex justify-content-between align-items-center'>
                    <h4 className='h5 mb-0'>Women Clothes</h4>

                    <Link to='/createWomen' className='btn btn-primary'>
                      Create
                    </Link>
                  </div>

                  <hr />

                  <div className='table-responsive'>
                    <table className='table table-striped table-bordered'>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Image</th>
                          <th>Title</th>
                          <th>Status</th>
                          <th>Content</th>
                          <th>Description</th>
                          <th>Price</th>
                          <th width='150'>Action</th>
                        </tr>
                      </thead>

                      <tbody>
                        {women.length > 0 ? (
                          women.map((item) => (
                            <tr key={item.id}>
                              <td>{item.id}</td>

                              <td>
                                {item.image ? (
                                  <img
                                    src={`http://127.0.0.1:8000/uploads/Womens/${item.image}`}
                                    alt={item.title}
                                    width='80'
                                    height='60'
                                    className='img-fluid rounded'
                                  />
                                ) : (
                                  'No Image'
                                )}
                              </td>

                              <td>{item.title}</td>

                              <td>
                                {item.status == 1 ? 'Active' : 'Blocked'}
                              </td>

                              <td>
                                {item.content
                                  ? item.content.substring(0, 50) + '...'
                                  : ''}
                              </td>

                              <td>
                                {item.description
                                  ? item.description.substring(0, 50) + '...'
                                  : ''}
                              </td>

                              <td>${item.price}</td>

                              <td className='d-flex'>
                                <Link
                                  to={`/editWomen/${item.id}`}
                                  className='btn btn-sm btn-danger me-2'
                                >
                                  Edit
                                </Link>

                                <button
                                  onClick={() => deleteWomen(item.id)}
                                  className='btn btn-sm btn-dark'
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan='8' className='text-center'>
                              No women cloth found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Show;