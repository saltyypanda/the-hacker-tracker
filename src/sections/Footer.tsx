export function Footer() {
  return (
    <footer className="footer sm:footer-horizontal footer-center bg-base-100 text-base-content p-8">
      <aside>
        <p>
          © {new Date().getFullYear()} - Made by Esther Hacker 🐼
        </p>
      </aside>
    </footer>
  );
}
