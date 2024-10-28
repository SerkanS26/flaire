const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="">
      <div className="mx-auto py-4">
        <div className="flex justify-center items-center">
          <p className="text-center text-text-light">
            © {currentYear} Flaire. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
