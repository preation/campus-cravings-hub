
export const Spinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent text-campus-orange" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};
