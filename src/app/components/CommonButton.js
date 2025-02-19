const CommonButton = ({ text, bgColor, textColor, onClick }) => {
  return (
    <button
      className={`${bgColor} ${textColor} rounded-md px-5 py-1`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
// Default props
CommonButton.defaultProps = {
  text: 'Click Me',
  bgColor: 'bg-blueButton', // default background color
  textColor: 'text-white', // default text color
};
export default CommonButton;
