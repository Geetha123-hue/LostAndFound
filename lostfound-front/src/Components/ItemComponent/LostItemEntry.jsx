import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserId } from "../../Services/LoginService";
import { generateId, saveLostItem } from "../../Services/LostItemService";
import "./LostItemEntry.css";

const LostItemEntry = () => {
  const navigate = useNavigate();

  const [flag, setFlag] = useState(false);
  const [errors, setErrors] = useState({});

  const [lostItem, setLostItem] = useState({
    lostItemId: "",
    lostItemName: "",
    color: "",
    brand: "",
    category: "",
    location: "",
    username: "",
    lostDate: "",
    status: false,
  });

  const [newId, setNewId] = useState("");
  const [ldate, setLdate] = useState(new Date().toISOString().split("T")[0]);
  const [userId, setUserId] = useState("");

  // 🔹 Load ID and user
  useEffect(() => {
    generateId().then((res) => setNewId(res.data));
    getUserId().then((res) => setUserId(res.data));
  }, []);

  // 🔹 Input handler
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setLostItem((prev) => ({ ...prev, [name]: value }));
    setFlag(false);
  };

  // 🔹 Submit to backend
  const lostItemSubmit = () => {
    const submitData = {
      ...lostItem,
      lostItemId: newId,
      username: userId,
      lostDate: ldate,
    };

    saveLostItem(submitData).then(() => {
      setFlag(true); // ✅ show success message
    });
  };

  // 🔹 Validation
  const handleValidation = (e) => {
    e.preventDefault();

    let tempErrors = {};
    let valid = true;

    if (!lostItem.lostItemName.trim()) {
      tempErrors.lostItemName = "Item Name is required";
      valid = false;
    }
    if (!lostItem.category.trim()) {
      tempErrors.category = "Category is required";
      valid = false;
    }
    if (!lostItem.color.trim()) {
      tempErrors.color = "Color is required";
      valid = false;
    }
    if (!lostItem.brand.trim()) {
      tempErrors.brand = "Brand is required";
      valid = false;
    }
    if (!lostItem.location.trim()) {
      tempErrors.location = "Location is required";
      valid = false;
    }

    setErrors(tempErrors);
    if (valid) lostItemSubmit();
  };

  const returnBack = () => navigate("/StudentMenu");
  const nextItem = () => navigate("/dummy/1");

  return (
    <div className="page-background">
      <div className="form-card">
        <h2>
          <u>Lost Item Form Submission</u>
        </h2>

        <form>
          <label className="input-label">Generated Item ID:</label>
          <input className="form-control" value={newId} readOnly />

          <label className="input-label">Name of Lost Item:</label>
          <input
            name="lostItemName"
            className="form-control"
            value={lostItem.lostItemName}
            onChange={onChangeHandler}
          />
          {errors.lostItemName && (
            <p className="error-text">{errors.lostItemName}</p>
          )}

          <label className="input-label">Category:</label>
          <input
            name="category"
            className="form-control"
            value={lostItem.category}
            onChange={onChangeHandler}
          />
          {errors.category && (
            <p className="error-text">{errors.category}</p>
          )}

          <label className="input-label">Color:</label>
          <input
            name="color"
            className="form-control"
            value={lostItem.color}
            onChange={onChangeHandler}
          />
          {errors.color && <p className="error-text">{errors.color}</p>}

          <label className="input-label">Brand:</label>
          <input
            name="brand"
            className="form-control"
            value={lostItem.brand}
            onChange={onChangeHandler}
          />
          {errors.brand && <p className="error-text">{errors.brand}</p>}

          <label className="input-label">Lost Location:</label>
          <input
            name="location"
            className="form-control"
            value={lostItem.location}
            onChange={onChangeHandler}
          />
          {errors.location && (
            <p className="error-text">{errors.location}</p>
          )}

          <label className="input-label">Lost Date:</label>
          <input
            type="date"
            className="form-control"
            value={ldate}
            onChange={(e) => setLdate(e.target.value)}
          />

          <div className="text-center" style={{ marginTop: "20px" }}>
            <button
              className="btn btn-primary"
              onClick={handleValidation}
              type="submit"
            >
              Submit
            </button>
            &nbsp;&nbsp;
            <button
              className="btn btn-success"
              type="button"
              onClick={returnBack}
            >
              Return
            </button>
          </div>
        </form>

        {/* ✅ SUCCESS MESSAGE */}
        {flag && (
          <p style={{ color: "blue", textAlign: "center", marginTop: "15px" }}>
            Lost Item Form Submitted.....
            <button
              className="btn btn-warning"
              onClick={nextItem}
              style={{ marginLeft: "10px" }}
            >
              New Form Submission
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default LostItemEntry;
