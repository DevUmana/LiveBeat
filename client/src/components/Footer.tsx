const Footer = () => {
  // Footer component
  return (
    <>
      <footer>
        <p className="text-center">
          &copy; {new Date().getFullYear()}{" "}
          <a href="https://www.example.com">LiveBeat</a>. All Rights Reserved.
        </p>
      </footer>
    </>
  );
};

export default Footer;
