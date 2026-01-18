import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserId } from '../../Services/LoginService';
import { generateId, saveLostItem } from '../../Services/LostItemService';
import './LostItemEntry.css';

const emptyForm = {
  lostItemId: "",
  lostItemName: "",
  color: "",
  brand: "",
  category: "",
  location: "",
  username: "",
  lostDate: new Date(),
  status: false,
};

const LostItemEntry = () => {
  const navigate = useNavigate();
  const [lostItem, setLostItem] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  const [newId, setNewId] = useState("");
  const [ldate, setLdate] = useState(new Date().toISOString().split("T")[0]);
  const [userId, setUserId] = useState("");

  const initForm = async () => {
    const idRes = await generateId();
    const userRes = await getUserId();
    setNewId(idRes.data);
    setUserId(userRes.data);
  };

  useEffect(() => {
    initForm();
  }, []);

  const onChangeHandler = (e) => {
    setSuccessMsg("");
    const { name, value } = e.target;
    setLostItem(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = async () => {
    setLostItem(emptyForm);
    setErrors({});
    setSuccessMsg("");
    await initForm();
  };

  const lostItemSubmit = async () => {
    const submitData = {
      ...lostItem,
      lostItemId: newId,
      username: userId,
      lostDate: ldate
    };

    await saveLostItem(submitData);
    setSuccessMsg("Lost Item Submitted Successfully!");
    resetForm();
  };

  const handleValidation = (e) => {
    e.preventDefault();
    let temp = {};
    let valid = true;

    if (!lostItem.lostItemName.trim()) { temp.lostItemName = "Item Name required"; valid = false; }
    if (!lostItem.category.trim()) { temp.category = "Category required"; valid = false; }
    if (!lostItem.color.trim()) { temp.color = "Color required"; valid = false; }
    if (!lostItem.brand.trim()) { temp.brand = "Brand required"; valid = false; }
    if (!lostItem.location.trim()) { temp.location = "Location required"; valid = false; }

    setErrors(temp);
    if (valid) lostItemSubmit();
  };

  return (
    <div className="page-background">
      <div className="form-card">
        <h2><u>Lost Item Form Submission</u></h2>

        <form onSubmit={handleValidation}>

          <label>Generated Item ID:</label>
          <input className="form-control" value={newId} readOnly />

          <label>Name:</label>
          <input name="lostItemName" className="form-control" value={lostItem.lostItemName} onChange={onChangeHandler} />
          {errors.lostItemName && <p className="error-text">{errors.lostItemName}</p>}

          <label>Category:</label>
          <input name="category" className="form-control" value={lostItem.category} onChange={onChangeHandler} />
          {errors.category && <p className="error-text">{errors.category}</p>}

          <label>Color:</label>
          <input name="color" className="form-control" value={lostItem.color} onChange={onChangeHandler} />
          {errors.color && <p className="error-text">{errors.color}</p>}

          <label>Brand:</label>
          <input name="brand" className="form-control" value={lostItem.brand} onChange={onChangeHandler} />
          {errors.brand && <p className="error-text">{errors.brand}</p>}

          <label>Location:</label>
          <input name="location" className="form-control" value={lostItem.location} onChange={onChangeHandler} />
          {errors.location && <p className="error-text">{errors.location}</p>}

          <label>Date:</label>
          <input type="date" className="form-control" value={ldate} onChange={(e) => setLdate(e.target.value)} />

          <div style={{ marginTop: 20 }}>
            <button className="btn btn-primary">Submit</button>
            &nbsp;
            <button className="btn btn-warning" type="button" onClick={resetForm}>New Form</button>
            &nbsp;
            <button className="btn btn-success" type="button" onClick={() => navigate('/StudentMenu')}>Return</button>
          </div>
        </form>

        {successMsg && <p style={{ color: "green", marginTop: 15 }}>{successMsg}</p>}
      </div>
    </div>
  );
};

export default LostItemEntry;