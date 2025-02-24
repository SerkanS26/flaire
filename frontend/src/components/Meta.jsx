import { Helmet } from "react-helmet-async";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Welcome To Flaire",
  description: "We sell the most popular and luxury women bags",
  keywords: "bags, buy bags, women bags, luxury bags, popular bags",
};

export default Meta;
