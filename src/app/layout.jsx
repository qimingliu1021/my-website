import RootLayout from "@/components/RootLayout";
import "./globals.css";

export const metadata = {
  title: {
    template: "blog_app",
    default: "Qiming Liu",
  },
};

export default function Layout({ children }) {
  return (
    <html
      lang="en"
      className="h-full text-base antialiased text-neutral-100"
      style={{ backgroundColor: "#F9D77C" }}
    >
      <body className="flex min-h-full flex-col">
        <RootLayout>{children}</RootLayout>
      </body>
    </html>
  );
}
