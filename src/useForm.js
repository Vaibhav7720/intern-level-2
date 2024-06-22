import { useState, useEffect } from "react";

const useForm = (callback) => {
  const [values, setValues] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    position: "",
    experience: "",
    portfolio: "",
    managementExperience: "",
    skills: [],
    interviewTime: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [errors]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setValues((prevValues) => {
      if (checked) {
        return {
          ...prevValues,
          skills: [...prevValues.skills, value],
        };
      } else {
        return {
          ...prevValues,
          skills: prevValues.skills.filter((skill) => skill !== value),
        };
      }
    });
  };

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
  };

  const validate = (values) => {
    let errors = {};

    if (!values.fullName) {
      errors.fullName = "Full Name is required";
    }

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email address is invalid";
    }

    if (!values.phoneNumber) {
      errors.phoneNumber = "Phone Number is required";
    }

    if (["Developer", "Designer"].includes(values.position)) {
      if (!values.experience) {
        errors.experience = "Relevant Experience is required";
      } else if (values.experience <= 0) {
        errors.experience = "Experience must be greater than 0";
      }
    }

    if (values.position === "Designer" && !values.portfolio) {
      errors.portfolio = "Portfolio URL is required";
    } else if (
      values.position === "Designer" &&
      !/^https?:\/\/.+/.test(values.portfolio)
    ) {
      errors.portfolio = "Portfolio URL is invalid";
    }

    if (values.position === "Manager" && !values.managementExperience) {
      errors.managementExperience = "Management Experience is required";
    }

    if (values.skills.length === 0) {
      errors.skills = "At least one skill must be selected";
    }

    if (!values.interviewTime) {
      errors.interviewTime = "Preferred Interview Time is required";
    }

    return errors;
  };

  return {
    handleChange,
    handleCheckboxChange,
    handleSubmit,
    values,
    errors,
  };
};

export default useForm;
