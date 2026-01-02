import { useState } from "react";
import { sendContact } from "../../services/contact.service";
import "./Contact.css";

export default function Contact({ onBack }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    website: "", // honeypot
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await sendContact(form);
      setSuccess(true);
      setForm({
        name: "",
        email: "",
        message: "",
        website: "",
      });
    } catch (err) {
      setError(err.message || "Error al enviar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="contact-section contact-normal">
      {/* BOTÓN VOLVER (solo si viene del motor) */}
      {onBack && (
        <button className="contact-back" onClick={onBack}>
          ← Volver a proyectos
        </button>
      )}

      {/* HEADER */}
      <div className="contact-header">
        <span className="contact-badge">DISPONIBLE PARA NUEVOS RETOS</span>

        <h2>
          Hablemos de <br />
          <span>tu próximo proyecto</span>
        </h2>

        <p>
          Especialista en arquitectura Backend, infraestructura Cloud y
          soluciones escalables. Completa el formulario y empecemos a construir.
        </p>
      </div>

      {/* GRID */}
      <div className="contact-grid">
        {/* FORM */}
        <div className="contact-card">
          <h3>Envíame un mensaje</h3>

          {success ? (
            <div className="contact-success">
              ✅ Mensaje enviado correctamente. Te responderé pronto.
            </div>
          ) : (
            <form onSubmit={onSubmit}>
              <div className="contact-row">
                <input
                  name="name"
                  placeholder="Ej. Juan Pérez"
                  value={form.name}
                  onChange={onChange}
                  required
                />

                <input
                  name="email"
                  type="email"
                  placeholder="hola@ejemplo.com"
                  value={form.email}
                  onChange={onChange}
                  required
                />
              </div>

              <textarea
                name="message"
                placeholder="Cuéntame los detalles de tu proyecto..."
                value={form.message}
                onChange={onChange}
                required
              />

              {/* Honeypot */}
              <input
                name="website"
                value={form.website}
                onChange={onChange}
                tabIndex={-1}
                autoComplete="off"
                className="honeypot"
              />

              <button disabled={loading}>
                {loading ? "Enviando..." : "Enviar Mensaje"}
              </button>

              {error && <p className="contact-error">❌ {error}</p>}
            </form>
          )}
        </div>

        {/* INFO */}
        <div className="contact-info">
          <h4>Información de contacto</h4>
          <p>
            Si prefieres otros medios o necesitas una respuesta inmediata,
            aquí tienes mis canales directos.
          </p>

          <div className="contact-info-card">
            <strong>Email</strong>
            <span>alonsopicho@gmail.com</span>
          </div>

          <div className="contact-info-card">
            <strong>LinkedIn</strong>
            <span>https://www.linkedin.com/in/carlos-alonso-picho-vargas-87738213b/</span>
          </div>
        </div>
      </div>
    </section>
  );
}
