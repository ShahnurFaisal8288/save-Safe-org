import React from 'react'

const ApproveStatus = () => {
    return (
        <div className="container">
          <header className="header">
            <h1>Health Insurance Enrollment Buffer</h1>
          </header>
          
          <section className="card">
            <h2>Project</h2>
            <div className="form-group">
              <label>Project<span>*</span></label>
              <input type="text" value="15 - Microfinance (Dabi)" disabled />
            </div>
          </section>
    
          <section className="card">
            <h2>VO Information</h2>
            <div className="form-group">
              <label>VO Code</label>
              <input type="text" value="2009" disabled />
            </div>
            <div className="form-group">
              <label>VO Name</label>
              <input type="text" value="KORAIL 2 NO KHA BLOCK -1" disabled />
            </div>
          </section>
    
          <section className="card">
            <h2>Member Information</h2>
            <div className="form-row">
              <div className="form-group">
                <label>Member Number<span>*</span></label>
                <input type="text" value="215" disabled />
              </div>
              <div className="form-group">
                <label>ERP Member Number</label>
                <input type="text" value="34148678" disabled />
              </div>
              <div className="form-group">
                <label>Member Name</label>
                <input type="text" value="Kusum" disabled />
              </div>
              <div className="form-group">
                <label>Member Category</label>
                <input type="text" value="Others" disabled />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Member Mobile Number</label>
                <input type="text" value="01765542454" disabled />
              </div>
              <div className="form-group">
                <label>Age</label>
                <input type="text" value="39" disabled />
              </div>
              <div className="form-group">
                <label>National ID</label>
                <input type="text" value="9572035849" disabled />
              </div>
            </div>
          </section>
    
          <section className="card">
            <h2>Insurance Information</h2>
            <div className="form-row">
              <div className="form-group">
                <label>Product<span>*</span></label>
                <input type="text" value="Shurokha Shastho Bima" disabled />
              </div>
              <div className="form-group">
                <label>Category<span>*</span></label>
                <input type="text" value="Shurokha-CAT-2" disabled />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Insurance Policy ID<span>*</span></label>
                <input type="text" value="1320SC2492291416681-0" disabled />
              </div>
              <div className="form-group">
                <label>Total Premium Amount</label>
                <input type="text" value="1000" disabled />
              </div>
              <div className="form-group">
                <label>Sum Insured</label>
                <input type="text" value="146500" disabled />
              </div>
            </div>
          </section>
    
          <section className="card">
            <h2>Nominee Information</h2>
            <div className="form-row">
              <div className="form-group">
                <label>Name<span>*</span></label>
                <input type="text" value="Test QS" disabled />
              </div>
              <div className="form-group">
                <label>Date of Birth<span>*</span></label>
                <input type="text" value="1990-12-15" disabled />
              </div>
              <div className="form-group">
                <label>Relationship<span>*</span></label>
                <input type="text" value="Daughter" disabled />
              </div>
              <div className="form-group">
                <label>Nominee Mobile Number<span>*</span></label>
                <input type="text" value="01764146535" disabled />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>National ID</label>
                <input type="text" value="Nominee's National ID" disabled />
              </div>
              <div className="form-group">
                <label>Birth Certificate Number</label>
                <input type="text" value="Nominee's Birth Certificate Number" disabled />
              </div>
              <div className="form-group">
                <label>Passport No.</label>
                <input type="text" value="Nominee's Passport No" disabled />
              </div>
              <div className="form-group">
                <label>Smart Card ID</label>
                <input type="text" value="9796596413" disabled />
              </div>
            </div>
          </section>
    
          <footer className="footer">
            <button className="btn reject">Reject</button>
            <button className="btn approve">Approve</button>
          </footer>
        </div>
      );
}

export default ApproveStatus
