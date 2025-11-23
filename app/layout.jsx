// import "./globals.css";

// export const metadata = {
//   title: "TinyLink",
//   description: "URL Shortener",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body>{children}</body>
//     </html>
//   );
// }






import "./globals.css";

export const metadata = {
  title: "TinyLink",
  description: "URL Shortener",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#fff" />
        {/* font preconnect for faster load */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}

