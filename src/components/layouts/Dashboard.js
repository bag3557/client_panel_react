import React from 'react';
import Clients from '../clients/Clients';
import Sidebar from '../layouts/Sidebar';

export default () => {
  return (
    <div className="row">
      <div className="col-md-10 col-8">
        <Clients />
      </div>
      <div className="col-md-2 col-4">
      <Sidebar />
      </div>
      
    </div>
  )
}
