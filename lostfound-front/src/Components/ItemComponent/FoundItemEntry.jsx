import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getUserId } from "../../Services/LoginService";
import { generateId, saveFoundItem } from "../../Services/FoundItemService";
import "./FoundItemEntry.css";

const FoundItemEntry = () => {
  const navigate = useNavigate();

  /* ---------- INITIAL FORM ---------- */
  const emptyForm = {
    foundItemName: "",
    category: "",
    color: "",
    brand: "",
    location: "",
  };

  /* ---------- STATES ---------- */
  const [foundItem, setFoundItem] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(true);

  const [newId, setNewId] = useState("");
  const [userId, setUserId] = useState("");
  const [fdate, setFdate] = useState(
    new Date().toISOString().split("T")[0]
  );

  /* ---------- LOAD NEW FORM (FIXED) ---------- */
  const loadNewForm = useCallback(async () => {
    try {
      const idRes = await generateId();
      const userRes = await getUserId();

      setNewId(idRes.data);
      setUserId(userRes.data);
      setFoundItem(emptyForm);
      setErrors({});
      setSuccessMsg("");
      setFdate(new Date().toISOString().split("T")[0]);
    } catch (error) {
      console.error("Error loading form", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNewForm();
  }, [loadNewForm]);

  /* ---------- INPUT HANDLER ---------- */
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFoundItem((prev) => ({ ...prev, [name]: value }));
  };

  /* ---------- SUBMIT + VALIDATION ---------- */
  const handleValidation = async (e) => {
    e.preventDefault();

    let tempErrors = {};
    let valid = true;

    Object.keys(emptyForm).forEach((field) => {
      if (!foundItem[field].trim()) {
        tempErrors[field] = "This field is required";
        valid = false;
      }
    });

    setErrors(tempErrors);
    if (!valid) return;

    const payload = {
      ...foundItem,
      foundItemId: newId,
      username: userId,
      foundDate: fdate,
      status: false,
    };

    try {
      await saveFoundItem(payload);
      setSuccessMsg("Found Item submitted successfully ✔");
    } catch (error) {
      alert("Submission failed");
      console.error(error);
    }
  };

  /* ---------- LOADING ---------- */
  if (loading) {
    return <h3 style={{ textAlign: "center" }}>Loading...</h3>;
  }

  /* ---------- UI ---------- */
  return (
    <div className="page-background">
      <div className="form-card">
        <h2><u>Found Item Form Submission</u></h2>

        <form onSubmit={handleValidation}>
          <label className="input-label">Generated Item ID:</label>
          <input className="form-control" value={newId} readOnly />

          {Object.keys(emptyForm).map((field) => (
            <div key={field}>
              <label className="input-label">
                {field.replace(/([A-Z])/g, " $1")}
              </label>
              <input
                name={field}
                className="form-control"
                value={foundItem[field]}
                onChange={onChangeHandler}
              />
              {errors[field] && (
                <p className="error-text">{errors[field]}</p>
              )}
            </div>
          ))}

          <label className="input-label">Found Date:</label>
          <input
            type="date"
            className="form-control"
            value={fdate}
            onChange={(e) => setFdate(e.target.value)}
          />

          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
            &nbsp;&nbsp;
            <button
              className="btn btn-success"
              type="button"
              onClick={() => navigate("/StudentMenu")}
            >
              Return
            </button>
          </div>
        </form>

        {successMsg && (
          <div style={{ textAlign: "center", marginTop: "15px" }}>
            <p style={{ color: "green" }}>{successMsg}</p>
            <button
              className="btn btn-warning"
              type="button"
              onClick={loadNewForm}
            >
              New Form Submission
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoundItemEntry;
