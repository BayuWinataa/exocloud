import Hero from "./Hero";
import Highlight from "./Highlight";
import Review from "./Review";

export default function HomePage() {
	return (
		<div className="min-h-screen bg-white">
			<Hero />
			<Highlight />
			<Review />
		</div>
	);
}
