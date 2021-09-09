
const Window = ({ header, children }) => {
    return (
      <div className="window">
        <div className="header">{header}</div>
        <div className="content">{children}</div>
      </div>
    );
};

export default Window;