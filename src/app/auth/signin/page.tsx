import { Metadata } from "next";
import SignIn from "./SignIn";
// import the client component

export const metadata: Metadata = {
  title: "Sign In | Glamora",
  description: "Modern Glassmorphic Sign In Page with Animations",
};

export default function Page() {
  return <SignIn />;
}
