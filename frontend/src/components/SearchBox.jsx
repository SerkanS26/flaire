import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const SearchBox = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();

  const [keyword, setKeyword] = useState(urlKeyword || "");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/shop/search/${keyword}`);
      setKeyword("");
    } else {
      navigate("/shop");
    }
  };
  return (
    <div>
      <form
        onSubmit={submitHandler}
        className="flex items-center justify-center gap-4 w-3/4 mx-auto"
      >
        <input
          type="text"
          onChange={(e) => setKeyword(e.target.value)}
          value={keyword}
          placeholder="Search a product..."
          className="w-full border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBox;
