function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen text-center">
      <div>
        <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
        <p className="mt-2 text-lg text-gray-500">
          The page you're looking for doesn't exist.
        </p>
      </div>
    </div>
  );
}

export default NotFound;
