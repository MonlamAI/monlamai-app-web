function CardComponent(props) {
  return (
    <div
      className={`flex rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 flex-col md:w-1/2 py-2 px-3
   ${props.className}`}
    >
      {props.children}
    </div>
  );
}

export default CardComponent;
