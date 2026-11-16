export default function Footer() {
  return <footer className="site-footer">
    <a className="footer-name" href="#home">Anand Rathod<span>.</span></a>
    <div className="footer-meta"><span>Amravati, Maharashtra, India</span><span>© {new Date().getFullYear()} Anand Rathod</span></div>
    <div className="footer-socials"><a href="https://github.com/baymax-14" target="_blank" rel="noreferrer noopener">GitHub ↗</a><a href="https://in.linkedin.com/in/anand-rathod" target="_blank" rel="noreferrer noopener">LinkedIn ↗</a><a href="tel:+919356030432">+91 93560 30432 ↗</a><a href="mailto:anand2005rathod@gmail.com">Email ↗</a></div>
  </footer>;
}
