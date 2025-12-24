import { useState } from "react";
import { sendContact } from "../services/contact.service";

export function useContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const submit = async (form) => {
    setLoading(true);
    setError(null);

    try {
      await sendContact(form);
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    submit,
    loading,
    success,
    error,
  };
}
