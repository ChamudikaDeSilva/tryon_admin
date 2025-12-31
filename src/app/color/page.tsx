import { Metadata } from "next";
import ColorPage from "./colorIndex";


// import the client component

export const metadata: Metadata = {
  title: "Sign In | Glamora",
  description: "Modern Glassmorphic Sign In Page with Animations",
};

export default function Page() {
  return <ColorPage />;
}
