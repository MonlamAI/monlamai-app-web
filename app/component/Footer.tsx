function Footer() {
  return (
    <div className="w-full p-4">
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
              <a
                href="https://www.facebook.com/profile.php?id=100092133731838"
                target="_blank"
                rel="noreferrer"
                className="mr-4 hover:underline md:mr-6 hover:text-blue-500"
              >
                <i className="fab fa-facebook-square fa-lg "></i>
              </a>
            </li>

            <li>
              <a
                href="https://www.instagram.com/monlam_ai/"
                target="_blank"
                rel="noreferrer"
                className="mr-4 hover:underline md:mr-6 hover:text-pink-500"
              >
                <i className="fab fa-instagram fa-lg"></i>
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com/Monlam_AI"
                target="_blank"
                rel="noreferrer"
                className="hover:underline hover:text-blue-300"
              >
                <i className="fab fa-twitter fa-lg"></i>
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
