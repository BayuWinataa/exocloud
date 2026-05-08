import Hero from "./Hero";
import Highlight from "./Highlight";
import Review from "./Review";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <Highlight />
      <Review />
    </main>
  );
}