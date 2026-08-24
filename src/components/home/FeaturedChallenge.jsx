import "./home.css";

function FeaturedChallenge() {
  return (
    <section className="featured-challenge">

      <div className="challenge-card">

        <h2>🍜 Weekly Challenge</h2>

        <h3>Cook The Best BIG F Noodles</h3>

        <p>

          Upload your best recipe.

          Community members vote.

          Winner gets

          <strong> KSh 10,000 </strong>

        </p>

        <div className="challenge-footer">

          <span>5 Days Left</span>

          <button>Participate</button>

        </div>

      </div>

    </section>
  );
}

export default FeaturedChallenge;