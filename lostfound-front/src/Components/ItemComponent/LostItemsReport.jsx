import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { getAllLostItems, getLostItemsByUsername } from "../../Services/LostItemService";
import './LostItemsReport.css';
import { getRole } from "../../Services/LoginService";

const LostItemsReport = () => {
  let navigate = useNavigate();
  const [itemList, setItemList] = useState([]);
  const [role, setRole] = useState("");

  const showLostItems = () => {
    getRole().then((response) => {
      setRole(response.data);

      if (response.data === 'Admin') {
        getAllLostItems().then((res1) => {
          setItemList(res1.data);
        });
      } else if (response.data === 'Student') {
        getLostItemsByUsername().then((res2) => {
          setItemList(res2.data);
        });
      }
    });
  };

  useEffect(() => {
    showLostItems();
  }, []);

  const returnBack = () => {
    if (role === 'Admin') navigate('/AdminMenu');
    else if (role === 'Student') navigate('/StudentMenu');
  };

  return (
    <div className="report-container">

      <div className="report-card">
        {/* Title Section */}
        <h2 className="report-title">
          {role === 'Admin' ? "Admin - Lost Item List" : "Student - Lost Item List"}
        </h2>
        <div className="subtitle">Lost Item List</div>

        {/* Table Section */}
        <table className="report-table">
          <thead>
            <tr>
              <th>Item Id</th>
              <th>Item Name</th>
              <th>Category</th>
              <th>Color</th>
              <th>Brand</th>
              <th>Location</th>
              <th>Lost Date</th>
              <th>User Id</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {itemList.map((item) => (
              <tr key={item.lostItemId}>
                <td>{item.lostItemId}</td>
                <td>{item.lostItemName}</td>
                <td>{item.category}</td>
                <td>{item.color}</td>
                <td>{item.brand}</td>
                <td>{item.location}</td>
                <td>{item.lostDate}</td>
                <td>{item.username}</td>

                <td className={item.status ? "status-found" : "status-notfound"}>
                  {item.status ? "Found" : "Not Found"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Return Button */}
        <button className="return-btn" onClick={returnBack}>
          Return
        </button>
      </div>
    </div>
  );
};

export default LostItemsReport;
