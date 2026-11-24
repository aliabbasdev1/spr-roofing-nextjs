
   import type { Metadata } from "next";
   import "./globals.css";

   export const metadata: Metadata = {
     title: "Under Maintenance | SPR Roofing",
     robots: { index: false, follow: false },
   };

   export default function RootLayout() {
     return (
       <html lang="en">
         <body style={{ margin: 0 }}>
           <main style={{
             minHeight: "100vh",
             background: "#111111",
             color: "#ffffff",
             display: "flex",
             alignItems: "center",
             justifyContent: "center",
             textAlign: "center",
             padding: "24px",
             fontFamily: "Arial, sans-serif"
           }}>
             <div>
               <h1 style={{ color: "#EAB34B", fontSize: "42px" }}>
                 SPR ROOFING
               </h1>
               <h2>Website Under Maintenance</h2>
               <p>We're making improvements to our website.</p>
               <p>For enquiries, call 0479 083 101.</p>
             </div>
           </main>
         </body>
       </html>
     );
   }
   