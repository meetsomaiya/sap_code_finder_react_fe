import React, { useEffect } from 'react';

const HeartBeat = () => {
  // Get the current page name from the window location
  const currentPage = window.location.pathname.split('/').pop().split('.')[0];

  console.log(currentPage);

  // Function to send heartbeat request
  const sendHeartbeat = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `http://localhost:8092/heartbeat.php?screen_name=${encodeURIComponent(currentPage)}`, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          console.log('Heartbeat sent successfully.');
        } else {
          console.error('Error sending heartbeat:', xhr.status);
        }
      }
    };
    xhr.send();
  };

  useEffect(() => {
    // Send heartbeat initially when the component is mounted
    sendHeartbeat();

    // Send heartbeat when the page is about to be closed or browser is closed
    window.addEventListener('beforeunload', sendHeartbeat);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener('beforeunload', sendHeartbeat);
    };
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return null; // This component doesn't render anything
};

export default HeartBeat;
