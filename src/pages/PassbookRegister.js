import React from 'react'

const PassbookRegister = () => {
  return (
    <div>
      <div className="content-wrapper">
      <div className="container mt-5">
        <div className="card shadow">
          <div className="card-header bg-primary text-white">
            <h2 className="title mb-0">Passbook Register</h2>
          </div>
          
          <div className="card-body">
            <form>
              {/* Top Section - Data Entry */}
              <div className="grid grid-cols-6 gap-4 mb-8">
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Account no.</label>
                  <input 
                    type="text" 
                    className="form-control w-full border rounded px-3 py-2" 
                    defaultValue="02584"
                  />
                </div>
                
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">LTS no.</label>
                  <input 
                    type="text" 
                    className="form-control w-full border rounded px-3 py-2"
                  />
                </div>
                
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Issue date</label>
                  <input 
                    type="text" 
                    className="form-control w-full border rounded px-3 py-2"
                    defaultValue="12/1/2013"
                  />
                </div>
                
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                  <select className="form-control w-full border rounded px-3 py-2">
                    <option>New Client</option>
                    <option>Renewal</option>
                    <option>Replacement</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Passbook type</label>
                  <select className="form-control w-full border rounded px-3 py-2">
                    <option>Loan</option>
                    <option>Saving</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Passbook no.</label>
                  <input 
                    type="text" 
                    className="form-control w-full border rounded px-3 py-2"
                    defaultValue="L010726"
                  />
                </div>
              </div>

              {/* Bottom Section - Passbook Numbers */}
              <div className="mt-8">
                <div className="grid grid-cols-4 gap-8">
                  {/* Saving Passbook */}
                  <div className="text-center">
                    <h3 className="text-lg font-medium text-indigo-600 mb-4">Saving Passbook</h3>
                    <div className="space-y-2">
                      <div>
                        <label className="block text-sm text-gray-600">Last Number:</label>
                        <div className="bg-gray-100 p-2 rounded font-mono">S019625</div>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600">Maximum Number:</label>
                        <div className="bg-gray-100 p-2 rounded font-mono">S050700</div>
                      </div>
                    </div>
                  </div>

                  {/* Loan Passbook */}
                  <div className="text-center">
                    <h3 className="text-lg font-medium text-indigo-600 mb-4">Loan Passbook</h3>
                    <div className="space-y-2">
                      <div>
                        <label className="block text-sm text-gray-600">Last Number:</label>
                        <div className="bg-gray-100 p-2 rounded font-mono">L026251</div>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600">Maximum Number:</label>
                        <div className="bg-gray-100 p-2 rounded font-mono">L026251</div>
                      </div>
                    </div>
                  </div>

                  {/* LTS Loan Passbook */}
                  <div className="text-center">
                    <h3 className="text-lg font-medium text-indigo-600 mb-4">LTS Loan Passbook</h3>
                    <div className="space-y-2">
                      <div>
                        <label className="block text-sm text-gray-600">Last Number:</label>
                        <div className="bg-gray-100 p-2 rounded font-mono">U003470</div>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600">Maximum Number:</label>
                        <div className="bg-gray-100 p-2 rounded font-mono">U003470</div>
                      </div>
                    </div>
                  </div>

                  {/* LTS Saving Passbook */}
                  <div className="text-center">
                    <h3 className="text-lg font-medium text-indigo-600 mb-4">LTS Saving Passbook</h3>
                    <div className="space-y-2">
                      <div>
                        <label className="block text-sm text-gray-600">Last Number:</label>
                        <div className="bg-gray-100 p-2 rounded font-mono">T035100</div>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600">Maximum Number:</label>
                        <div className="bg-gray-100 p-2 rounded font-mono">T035100</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default PassbookRegister
