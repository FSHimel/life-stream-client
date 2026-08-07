const Contact = () => {
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-secondary">Contact Us</h2>
          <p className="text-gray-500 mt-3">
            Have questions or need assistance? Send us a message.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="bg-blue-50 border border-blue-100 rounded-2xl shadow-lg p-8 space-y-6">
            <div>
              <h3 className="font-bold text-xl">📞 Phone</h3>
              <p>+880 1***-******</p>
            </div>

            <div>
              <h3 className="font-bold text-xl">✉️ Email</h3>
              <p>support@lifestream.com</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-blue-50 border border-blue-100 rounded-2xl shadow-lg p-8">
            <form className="space-y-5">
              <input
                type="text"
                placeholder="Full Name"
                className="input input-bordered w-full"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="input input-bordered w-full"
              />

              <input
                type="text"
                placeholder="Subject"
                className="input input-bordered w-full"
              />

              <textarea
                placeholder="Write your message..."
                className="textarea textarea-bordered w-full h-40"
              ></textarea>

              <button className="btn btn-primary w-full">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
