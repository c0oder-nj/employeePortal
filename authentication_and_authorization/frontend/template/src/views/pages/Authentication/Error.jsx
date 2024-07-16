import React, { useEffect, useState } from 'react';

export default function Error({ message, display }) {
  const [show, setShow] = useState(display);

  useEffect(() => {
    if (display === 'block') {
      setShow('block');
      const timer = setTimeout(() => {
        setShow('none');
      }, 4000);

      // Cleanup the timeout on component unmount or props change
      return () => clearTimeout(timer);
    }
  }, [message, display]);

  return (
    <div id='alert-div' className="alert alert-warning alert-dismissible fade show" style={{ display: show }}>
      <strong>Error:</strong> {message}
      <button type="button" className="btn-close" onClick={() => setShow('none')}></button>
    </div>
  );
}
