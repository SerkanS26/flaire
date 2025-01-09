import PropTypes from "prop-types";

const Message = ({ variant, children }) => {
  return (
    <div className={`alert alert-${variant} container mx-auto`}>{children}</div>
  );
};

//Define prop types
Message.propTypes = {
  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "danger",
    "warning, info",
    "light",
    "dark",
  ]),
  children: PropTypes.node.isRequired,
};

//Define default props
Message.defaultProps = {
  variant: "primary",
};

export default Message;
