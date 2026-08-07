import "./Loading.css";

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <section className="dots-container">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </section>
    </div>
  );
};

export default Loading;
