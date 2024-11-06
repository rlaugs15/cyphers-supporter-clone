import { useNavigate, useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();
  console.log("error", error);

  const nav = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-sm p-8 text-center bg-white rounded-md shadow-lg">
        <h1 className="mb-4 text-4xl font-bold text-red-500">Oops!</h1>
        <p className="mb-6 text-gray-700">
          페이지의 데이터가 존재하지 않습니다.
        </p>
        <button
          onClick={() => nav("/")}
          className="px-4 py-2 text-white transition duration-200 bg-blue-500 rounded hover:bg-blue-600"
        >
          홈 화면으로
        </button>
      </div>
    </div>
  );
}

export default ErrorPage;
