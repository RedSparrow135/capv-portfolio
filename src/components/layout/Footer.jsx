import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
        <span className="footer-logo">CAPV</span>
        <span>© 2024 Carlos Alonso Picho Vargas</span>
      </div>

      <div className="footer-right">
        <a href="#">Política de Privacidad</a>
        <a href="#">Términos de Uso</a>
      </div>
    </footer>
  )
}
