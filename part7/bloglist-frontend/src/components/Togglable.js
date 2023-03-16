import { forwardRef, useImperativeHandle, useState } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

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
        <Button className="show-button" onClick={toggleVisibility}>
          {showText}
        </Button>
      )}
      {visibility && (
        <Button className="hide-button" onClick={toggleVisibility}>
          {hideText}
        </Button>
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
