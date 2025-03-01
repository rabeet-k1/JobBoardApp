import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme";
import StoreProvider from "@/providers/StoreProvider";
import SnackProvider from "@/providers/SnackProvider";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata = {
  title: "Job Board App",
  description:
    "Join the growing Job Board App community and find the perfect job for you.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable}`}>
        <AppRouterCacheProvider>
          <StoreProvider>
            <SnackProvider>
              <ThemeProvider theme={theme}>{children}</ThemeProvider>
            </SnackProvider>
          </StoreProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
