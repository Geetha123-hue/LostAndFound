import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserId } from "../../Services/LoginService";
import { generateId, saveFoundItem } from "../../Services/FoundItemService";
import "./FoundItemEntry.css";

const FoundItemEntry = () => {
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [flag, setFlag] = useState(false);

  const [foundItem, setFoundItem] = useState({
    foundItemId: "",
    foundItemName: "",
    color: "",
    brand: "",
    category: "",
    location: "",
    username: "",
    foundDate: "",
    status: true,
  });

  const [newId, setNewId] = useState("");
  const [fdate, setFdate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [userId, setUserId] = useState("");

  // 🔹 Load ID & user
  useEffect(() => {
    generateId().then((res) => setNewId(res.data));
    getUserId().then((res) => setUserId(res.data));
  }, []);

  // 🔹 Input handler
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFoundItem((prev) => ({ ...prev, [name]: value }));
    setFlag(false);
  };

  // 🔹 Submit
  const foundItemSubmit = () => {
    const submitData = {
      ...foundItem,
      foundItemId: newId,
      username: userId,
      foundDate: fdate,
    };

    saveFoundItem(submitData)
      .then(() => {
        setFlag(true); // ✅ show success message
      })
      .catch(() => alert("Submission failed"));
  };

  // 🔹 Validation
  const handleValidation = (e) => {
    e.preventDefault();

    let tempErrors = {};
    let valid = true;

    if (!foundItem.foundItemName.trim()) {
      tempErrors.foundItemName = "Item Name is required";
      valid = false;
    }
    if (!foundItem.category.trim()) {
      tempErrors.category = "Category is required";
      valid = false;
    }
    if (!foundItem.color.trim()) {
      tempErrors.color = "Color is required";
      valid = false;
    }
    if (!foundItem.brand.trim()) {
      tempErrors.brand = "Brand is required";
      valid = false;
    }
    if (!foundItem.location.trim()) {
      tempErrors.location = "Location is required";
      valid = false;
    }

    setErrors(tempErrors);
    if (valid) foundItemSubmit();
  };

  const returnBack = () => navigate("/StudentMenu");
  const nextItem = () => navigate("/dummy/2");

  return (
    <div className="page-background">
      <div className="form-card">
        <h2>
          <u>Found Item Form Submission</u>
        </h2>

        <form>
          <label className="input-label">Generated Item ID:</label>
          <input className="form-control" value={newId} readOnly />

          <label className="input-label">Name of Found Item:</label>
          <input
            name="foundItemName"
            className="form-control"
            value={foundItem.foundItemName}
            onChange={onChangeHandler}
          />
          {errors.foundItemName && (
            <p className="error-text">{errors.foundItemName}</p>
          )}

          <label className="input-label">Category:</label>
          <input
            name="category"
            className="form-control"
            value={foundItem.category}
            onChange={onChangeHandler}
          />
          {errors.category && (
            <p className="error-text">{errors.category}</p>
          )}

          <label className="input-label">Color:</label>
          <input
            name="color"
            className="form-control"
            value={foundItem.color}
            onChange={onChangeHandler}
          />
          {errors.color && <p className="error-text">{errors.color}</p>}

          <label className="input-label">Brand:</label>
          <input
            name="brand"
            className="form-control"
            value={foundItem.brand}
            onChange={onChangeHandler}
          />
          {errors.brand && <p className="error-text">{errors.brand}</p>}

          <label className="input-label">Found Location:</label>
          <input
            name="location"
            className="form-control"
            value={foundItem.location}
            onChange={onChangeHandler}
          />
          {errors.location && (
            <p className="error-text">{errors.location}</p>
          )}

          <label className="input-label">Found Date:</label>
          <input
            type="date"
            className="form-control"
            value={fdate}
            onChange={(e) => setFdate(e.target.value)}
          />

          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <button
              className="btn btn-primary"
              type="submit"
              onClick={handleValidation}
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
            Found Item Form Submitted.....
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

export default FoundItemEntry;
