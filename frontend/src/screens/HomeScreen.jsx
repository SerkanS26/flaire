import Banner from "../components/Banner";
import HomeProductCard from "../components/HomeProductCard";

const HomeScreen = () => {
  return (
    <>
      <Banner />
      <HomeProductCard
        bg="bg-[#F1F1F1]"
        img="/images/lacoste-blue.png"
        name="Lacoste Blue Leather Tote Bag"
        description="Elevate your style with this elegant blue leather tote bag from
          Lacoste. Crafted from premium leather, this bag exudes sophistication
          and durability. The smooth texture and minimalist design make it both
          versatile and timeless. With two long handles for easy carrying, it’s
          perfect for daily use or special outings. The zippered top closure
          keeps your belongings secure. Featuring the iconic Lacoste crocodile
          logo prominently in the center, this tote bag effortlessly combines
          fashion with function. Whether you're heading to work or a casual
          evening out, this bag is a statement piece that enhances any outfit."
      />

      <HomeProductCard
        bg="bg-slate-50"
        order="order-last"
        img="/images/boss-black.png"
        name="BOSS Leather Tote Bag"
        description="Make a bold statement with the sleek and elegant BOSS Leather Tote Bag. Crafted from premium leather, this black tote embodies sophistication and modern style. Its minimalistic design features the embossed BOSS branding on the front, adding a touch of luxury to any ensemble.

The sturdy handles ensure comfort and durability, making it perfect for both professional and casual settings. Whether you're headed to the office, a meeting, or a day out, this bag is designed to complement your look with an air of confidence and refinement.

Upgrade your accessory game with the BOSS Leather Tote Bag—a true symbol of elegance and function."
      />
    </>
  );
};

export default HomeScreen;
