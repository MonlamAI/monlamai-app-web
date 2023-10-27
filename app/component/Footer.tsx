function Footer() {
  const logos = [
    {
      name: "facebook",
      link: "https://www.facebook.com/profile.php?id=100092133731838",
      icon: "fab fa-facebook-square fa-lg",
      color: "#3b5998",
    },
    {
      name: "instagram",
      link: "https://www.instagram.com/monlam_ai/",
      icon: "fab fa-instagram fa-lg",
      color: "#e4405f",
    },
    {
      name: "twitter",
      link: "https://twitter.com/Monlam_AI",
      icon: "fab fa-twitter fa-lg",
      color: "#55acee",
    },
  ];

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
          <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-400 sm:mt-2">
            {logos.map((logo) => {
              return (
                <li key={logo.name}>
                  <a
                    href={logo.link}
                    target="_blank"
                    rel="noreferrer"
                    className={`mr-4 hover:underline opacity-40 hover:opacity-100 md:mr-6 transition-all duration-500`}
                    style={{ color: logo.color }}
                  >
                    <i className={logo.icon}></i>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
