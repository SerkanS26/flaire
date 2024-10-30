const Banner = () => {
  return (
    <section
      className="container mx-auto bg-primary-light mt-4  min-h-[650px]
        rounded-b-xl grid grid-cols-1 lg:grid-cols-2 gap-4 items-center
    "
    >
      <div className="header__content mx-auto text-center px-3 lg:text-left">
        <h4 className="text-primary capitalize pt-4">up to 30% discount on </h4>
        <h1 className="text-6xl md:text-7xl">
          Discover the elegance of flaire
        </h1>
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

      <div className=" h-auto mx-auto w-96 mt-[340px]  lg:mt-0 lg:h-full lg:w-full relative ">
        <img
          src="/images/header.png"
          alt="banner image"
          className=" absolute bottom-0 h-96  lg:h-[650px] lg:bottom-0 lg:right-0  object-cover"
        />
      </div>
    </section>
  );
};

export default Banner;
