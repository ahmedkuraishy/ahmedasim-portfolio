export const metadata = {
  title: "Clyde Portfolio",
  description: "Creative UI/UX Designer & Developer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body data-spy="scroll" data-target=".site-navbar-target" data-offset="300">
        {children}
      </body>
    </html>
  );
}
