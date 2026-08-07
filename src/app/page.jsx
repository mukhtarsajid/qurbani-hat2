 
import AnimalCard from "./components/AnimalCard";
import "./page.css";

async function getAnimals() {
  const res = await fetch("https://qurbani-hat2.vercel.app/.json", {
    cache: "no-store",
  });
  return res.json();
}

export default async function HomePage() {
  const animals = await getAnimals();
  const featured = animals.slice(0, 4);

  return (
    <div className="home-wrapper">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content animate__animated animate__fadeInDown">
          <h1>Find Your Perfect Qurbani Animal</h1>
          <p>
            Bangladesh's most trusted livestock marketplace. Browse hundreds of
            healthy cows and goats from verified sellers across the country.
          </p>
          <a href="/animals" className="hero-btn">
            Browse All Animals
          </a>
        </div>
      </section>

      {/* Featured Animals */}
      <section className="featured-section">
        <div className="section-header">
          <h2>Featured Animals</h2>
          <p>Hand-picked healthy animals for your Qurbani</p>
        </div>
        <div className="animals-grid">
          {featured.map((animal) => (
            <AnimalCard key={animal.id} animal={animal} />
          ))}
        </div>
      </section>

      {/* Qurbani Tips Section */}
      <section className="tips-section">
        <div className="section-header">
          <h2>Qurbani Tips</h2>
          <p>Important things to know before buying</p>
        </div>
        <div className="tips-grid">
          <div className="tip-card">
            <span className="tip-icon">✅</span>
            <h3>Check Health Certificate</h3>
            <p>Always ask for the health certificate and vaccination records before purchasing.</p>
          </div>
          <div className="tip-card">
            <span className="tip-icon">⚖️</span>
            <h3>Verify the Weight</h3>
            <p>Make sure the animal is weighed properly. Minimum weight for cow is 200kg.</p>
          </div>
          <div className="tip-card">
            <span className="tip-icon">🎂</span>
            <h3>Check the Age</h3>
            <p>Cow must be at least 2 years old and goat must be at least 1 year old for Qurbani.</p>
          </div>
          <div className="tip-card">
            <span className="tip-icon">🔍</span>
            <h3>Inspect Physically</h3>
            <p>Always inspect the animal physically before making the final payment.</p>
          </div>
        </div>
      </section>

      {/* Top Breeds Section */}
      <section className="breeds-section">
        <div className="section-header">
          <h2>Top Breeds for Qurbani</h2>
          <p>Most popular and trusted breeds available</p>
        </div>
        <div className="breeds-grid">
          <div className="breed-card">
            <span className="breed-emoji">🐄</span>
            <h3>Shahiwal</h3>
            <p>Premium Pakistani breed. Known for large size and good meat quality.</p>
          </div>
          <div className="breed-card">
            <span className="breed-emoji">🐄</span>
            <h3>Friesian</h3>
            <p>Australian imported breed. Heavy weight and healthy constitution.</p>
          </div>
          <div className="breed-card">
            <span className="breed-emoji">🐐</span>
            <h3>Black Bengal</h3>
            <p>Native Bangladeshi breed. Famous for excellent meat quality.</p>
          </div>
          <div className="breed-card">
            <span className="breed-emoji">🐐</span>
            <h3>Boer Goat</h3>
            <p>South African breed. Large size with premium meat quality.</p>
          </div>
        </div>
      </section>
    </div>
  );
}