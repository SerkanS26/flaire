const HomeProductCard = ({ bg, order, img, name, description }) => {
  return (
    <div
      className={`container ${bg} h-auto mx-auto mt-10 px-12 rounded-lg 
        grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 font-poppins 
     `}
    >
      {/* left */}
      <div className={`${order}`}>
        <img
          className={`object-cover lg:h-96 lg:w-96  h-52 w-52 mx-auto rounded-2xl`}
          src={img}
          alt="lacoste bag blue"
        />
      </div>
      {/* right */}
      <div className="flex flex-col justify-center items-center ">
        <h2 className="text-3xl font-semibold text-[#555573]">{name}</h2>
        <p className="text-md text-gray-600 mt-3 text-center">{description}</p>
        <button className="btn mt-4">Add to Cart</button>
      </div>
    </div>
  );
};

export default HomeProductCard;