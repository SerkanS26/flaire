const ContactScreen = () => {
  return (
    <div className="bg-extra-light min-h-screen flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-lg w-full">
        <h2 className="text-primary-dark text-2xl font-semibold mb-6 text-center">
          Contact Us
        </h2>
        <p className="text-text-light text-center mb-6">
          Have questions? We&apos;d love to hear from you.
        </p>
        <form className="space-y-4">
          <div>
            <label className="block text-text-dark mb-1">Name</label>
            <input
              type="text"
              className="w-full p-2 border border-primary-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark bg-extra-light text-text-dark"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label className="block text-text-dark mb-1">Email</label>
            <input
              type="email"
              className="w-full p-2 border border-primary-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark bg-extra-light text-text-dark"
              placeholder="Your Email"
            />
          </div>
          <div>
            <label className="block text-text-dark mb-1">Message</label>
            <textarea
              rows="4"
              className="w-full p-2 border border-primary-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark bg-extra-light text-text-dark"
              placeholder="Your Message"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-primary-dark text-extra-light py-2 rounded-lg hover:bg-opacity-90 transition"
          >
            Send Message
          </button>
        </form>
        <div className="mt-6 text-center text-text-light">
          <p>Email: contact@flaire.be</p>
          <p>Phone: +32 2 123 45 67</p>
          <p>Address: 1000 Brussels, Belgium</p>
        </div>
      </div>
    </div>
  );
};

export default ContactScreen;
