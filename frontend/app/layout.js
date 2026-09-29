import "./globals.css";

export const metadata = {
  title: "Readiness | Stride",
  description:
    "A clear view of your training fatigue, recovery, and readiness trends.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="app-shell">{children}</div>
      </body>
    </html>
  );
}
