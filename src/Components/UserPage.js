import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./user.css";

const UserPage = () => {
  const configuredFields = useSelector((state) => state.admin.config.fields);
  const [formData, setFormData] = useState({});

  const occupationOptions = [
    { value: 'student', label: '👤 Student' },
    { value: 'business', label: '👤 Business' },
    { value: 'salaried', label: '👤 Salaried' },
  ];

  const handleInputChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const handleSubmit = () => {
    console.log("Form Data:", formData);
    setFormData({});
  };

  const renderInput = (field) => {
    switch (field.type) {
      case "textbox":
        return (
          <input
            type="text"
            className="btn btn-outline-dark"
            style={{width:"100"}}
            onChange={(e) => handleInputChange(field.config.displayName, e.target.value)}
          />
        );
      case "dropdown":
        // Handle dropdown fields
        return (
          <select
            className="btn btn-secondary"
            style={{width:"100"}}
            onChange={(e) => handleInputChange(field.config.displayName, e.target.value)}
          >
            {field.config.fieldData?.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      case "datepicker":
        return (
          <input
            type="date"
            className="btn btn-secondary"
            style={{width:"100"}}
            onChange={(e) => handleInputChange(field.config.displayName, e.target.value)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {/* dropdown field */}
      <div className="form-group">
        <div className="centered-dropdown" >
          <select
          className="btn btn-secondary"
            onChange={(e) => handleInputChange("occupation", e.target.value)}
          >
            {occupationOptions.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        </div>
      <h2>User Page</h2>
      <form>
        {configuredFields?.map((field, index) => (
          <div key={index} className="form-group">
            <label>{field.config.displayName}</label>
            {renderInput(field)}
          </div>
        ))}
        
        <button type="button" className="btn btn-primary" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default UserPage;
