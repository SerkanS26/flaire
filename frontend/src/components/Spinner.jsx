import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: " 100px auto",
};

const Spinner = ({ loading }) => {
  return (
    <ClipLoader
      color="#DAA520"
      loading={loading}
      cssOverride={override}
      size={150}
      aria-label="Loading Spinner"
    />
  );
};

export default Spinner;
