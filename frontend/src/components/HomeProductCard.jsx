import { Link } from "react-router-dom";

const HomeProductCard = ({ bg, order, img, name, description, url }) => {
  return (
    <div
      className={`container ${bg} h-auto mx-auto mt-10 px-12 rounded-lg 
        grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 font-poppins 
     `}
    >
      {/* left */}
      <div className={`${order} md:order-first`}>
        <img
          className={`object-cover lg:h-96 lg:w-96  h-52 w-52 mx-auto rounded-2xl`}
          src={img}
          alt="lacoste bag blue"
        />
      </div>
      {/* right */}
      <div className="flex flex-col justify-center items-center ">
        <h2 className="font-semibold text-xl text-center text-[#555573] md:text-2xl lg:text-3xl">
          {name}
        </h2>
        <p className=" text-base text-gray-600 mt-3  text-left md:text-lg">
          {description}
        </p>
        <Link to={url} className="btn mt-4">
          View Product
        </Link>
      </div>
    </div>
  );
};

export default HomeProductCard;
