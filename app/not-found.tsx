const NotFound = () => {
  return (
    <main>
      <div className="mx-auto flex h-96 items-center justify-start px-4 md:px-8">
        <div className="mx-auto max-w-lg text-center">
          <div className="pb-6">
            <img
              src="/star-svgrepo-com1024.png"
              width={150}
              className="mx-auto"
              alt="Project Gallery Logo"
            />
          </div>
          <h3 className="text-4xl font-semibold text-gray-800 sm:text-5xl">
            Page not found
          </h3>
          <p className="mt-3 text-gray-600">
            Sorry, the page you are looking for could not be found or has been
            removed.
          </p>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
