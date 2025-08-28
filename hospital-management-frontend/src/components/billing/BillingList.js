import React, { useEffect, useState } from "react";
import API from "../../api/api";

const BillingList = () => {
  const [bills, setBills] = useState([]);

  const fetchBills = async () => {
    try {
      const res = await API.get("/billing");
      setBills(res.data);
    } catch (err) {
      alert("Error fetching bills");
    }
  };

  useEffect(() => { fetchBills(); }, []);

  return (
    <div>
      <h3>Billing</h3>
      <table className="table table-bordered">
        <thead>
          <tr><th>Patient</th><th>Doctor</th><th>Treatments</th><th>Total</th></tr>
        </thead>
        <tbody>
          {bills.map(b => (
            <tr key={b.id}>
              <td>{b.patientName}</td>
              <td>{b.doctorName}</td>
              <td>{b.treatments.map(t=>`${t.treatment} (${t.cost})`).join(", ")}</td>
              <td>{b.treatments.reduce((sum,t)=>sum+t.cost,0)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BillingList;
