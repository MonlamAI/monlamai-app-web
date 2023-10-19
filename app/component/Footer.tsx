function Footer() {
  return (
    <footer className="p-4 lg:fixed bottom-0 w-full">
      <div className=" mx-auto max-w-screen-xl p-4 flex flex-col md:flex-row items-center md:justify-between">
        <div className="text-sm text-gray-400 sm:text-center">
          <a href="#" className="hover:underline">
            © Monlam IT 2023
          </a>
          . All Rights Reserved.
        </div>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-400 sm:mt-0">
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6 ">
              <i className="fab fa-facebook-square"></i>
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              <i className="fab fa-discord"></i>
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              <i className="fab fa-instagram"></i>
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              <i className="fab fa-twitter"></i>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
