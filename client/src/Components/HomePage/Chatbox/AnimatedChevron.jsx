import "./AnimatedChevron.scoped.css";

const AnimatedChevron = ({ isChatboxExpanded, setIsChatboxExpanded }) => {
  return (
    <button
      onClick={() =>
        setIsChatboxExpanded((prevState) => {
          return !prevState;
        })
      }
      className={`chevron-container ${
        isChatboxExpanded ? "right-chevron-container" : "left-chevron-container"
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18px"
        height="40px"
        viewBox="0 0 18 40"
      >
        <rect width="4" height="22.5" x="7" ry="2" className="top-line" />
        <rect
          width="4"
          height="22.5"
          x="7"
          y="17.5"
          ry="2"
          className="bottom-line"
        />
      </svg>
    </button>
  );
};
export default AnimatedChevron;
