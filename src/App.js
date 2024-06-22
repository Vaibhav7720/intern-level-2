import React, { useState } from "react";
import useForm from "./useForm";

const App = () => {
  const { values, errors, handleChange, handleCheckboxChange, handleSubmit } =
    useForm(submit);

  function submit() {
    alert(JSON.stringify(values, null, 2));
  }

  return (
    <div>
      <h1>Job Application Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name:</label>
          <input
            type="text"
            name="fullName"
            value={values.fullName}
            onChange={handleChange}
          />
          {errors.fullName && <p>{errors.fullName}</p>}
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="number"
            name="phoneNumber"
            value={values.phoneNumber}
            onChange={handleChange}
          />
          {errors.phoneNumber && <p>{errors.phoneNumber}</p>}
        </div>
        <div>
          <label>Applying for Position:</label>
          <select
            name="position"
            value={values.position}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="Manager">Manager</option>
          </select>
          {errors.position && <p>{errors.position}</p>}
        </div>
        {["Developer", "Designer"].includes(values.position) && (
          <div>
            <label>Relevant Experience (years):</label>
            <input
              type="number"
              name="experience"
              value={values.experience}
              onChange={handleChange}
            />
            {errors.experience && <p>{errors.experience}</p>}
          </div>
        )}
        {values.position === "Designer" && (
          <div>
            <label>Portfolio URL:</label>
            <input
              type="text"
              name="portfolio"
              value={values.portfolio}
              onChange={handleChange}
            />
            {errors.portfolio && <p>{errors.portfolio}</p>}
          </div>
        )}
        {values.position === "Manager" && (
          <div>
            <label>Management Experience:</label>
            <input
              type="text"
              name="managementExperience"
              value={values.managementExperience}
              onChange={handleChange}
            />
            {errors.managementExperience && (
              <p>{errors.managementExperience}</p>
            )}
          </div>
        )}
        <div>
          <label>Additional Skills:</label>
          <div>
            <label>
              <input
                type="checkbox"
                name="skills"
                value="JavaScript"
                checked={values.skills.includes("JavaScript")}
                onChange={handleCheckboxChange}
              />
              JavaScript
            </label>
            <label>
              <input
                type="checkbox"
                name="skills"
                value="CSS"
                checked={values.skills.includes("CSS")}
                onChange={handleCheckboxChange}
              />
              CSS
            </label>
            <label>
              <input
                type="checkbox"
                name="skills"
                value="Python"
                checked={values.skills.includes("Python")}
                onChange={handleCheckboxChange}
              />
              Python
            </label>
            {/* Add more skills as needed */}
          </div>
          {errors.skills && <p>{errors.skills}</p>}
        </div>
        <div>
          <label>Preferred Interview Time:</label>
          <input
            type="datetime-local"
            name="interviewTime"
            value={values.interviewTime}
            onChange={handleChange}
          />
          {errors.interviewTime && <p>{errors.interviewTime}</p>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;
