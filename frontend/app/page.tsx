import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Footer } from "@/components/footer";
import { Flow } from "@/components/flow";
import { UseCases } from "@/components/section";



export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Flow />
        <UseCases />
      </main>
      <Footer />
    </>
  );
}
