import type React from "react";
import "../assets/styles.css";
import { Poppins } from "next/font/google";

type Props = {
  Component: React.ComponentType;
  pageProps: {
    [key: string]: unknown;
  };
};

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

export default function MyApp({ Component, pageProps }: Props): JSX.Element {
  const { ...componentProps } = pageProps;

  return (
    <div className={poppins.variable}>
      <Component {...componentProps} />
    </div>
  );
}
