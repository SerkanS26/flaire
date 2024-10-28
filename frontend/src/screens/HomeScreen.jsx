const HomeScreen = () => {
  return (
    <section className="max-w-[1400px] mx-auto bg-primary-light header__container">
      <div className="header__content">
        <h4 className="capitalize text-primary ">up to 30% discount on</h4>
        <h1 className="text-4xl font-bold">Discover the Elegance of Flaire</h1>
        <p>
          Step into a world of style and sophistication with our exclusive
          collection of women&apos;s bags. Each piece is meticulously designed
          to complete your look, whether you&apos;re heading to the office, a
          night out, or a weekend getaway. At Flaire, you&apos;ll find the
          perfect bag for every occasion.
        </p>
        <a href="/shop" className="btn">
          <button>Explore Now</button>
        </a>
      </div>
      <div className="header__image">
        <img src="/images/header.png" alt="banner image" />
      </div>
    </section>
  );
};

export default HomeScreen;
