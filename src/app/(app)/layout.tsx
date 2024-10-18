import { Footer } from "@/components/blocks/footer";
import { Header } from "@/components/blocks/header";

export default async function Layout({ children }: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>);
}