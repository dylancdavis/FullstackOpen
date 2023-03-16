import { forwardRef, useImperativeHandle, useState } from "react";
import PropTypes from "prop-types";

const Togglable = forwardRef(({ showText, hideText, children }, refs) => {
  const [visibility, setVisibility] = useState(false);

  const toggleVisibility = () => {
    setVisibility(!visibility);
  };

  useImperativeHandle(refs, () => {
    return { toggleVisibility };
  });

  return (
    <>
      {!visibility && (
        <button className="show-button" onClick={toggleVisibility}>
          {showText}
        </button>
      )}
      {visibility && (
        <button className="hide-button" onClick={toggleVisibility}>
          {hideText}
        </button>
      )}
      {visibility && children}
    </>
  );
});

Togglable.displayName = "Togglable";

Togglable.propTypes = {
  showText: PropTypes.string.isRequired,
  hideText: PropTypes.string.isRequired,
};

export default Togglable;
