import { FC } from 'react';

interface Props {}

const PostList: FC = () => {
  return (
    <div className="w-[720px] grid grid-cols-1 gap-y-3 mx-auto">
      <div className="border border-gray-100 rounded-lg">
        <div className="flex p-2">
          <img
            className="w-7 h-7 rounded-full mr-2"
            src="https://www.techhub.in.th/wp-content/uploads/2021/05/DhYGYs6WkAAScEU.jpg"
            alt=""
          />
          <span>Test My name</span>
        </div>
        <div className="my-3 px-2">Hello my first post on this website.</div>
        <div>
          <img className="w-full" src="https://picsum.photos/seed/picsum/1920/1920" />
        </div>
        <div className="flex p-3">
          <div className="w-[50%]">
            <button className="w-full flex justify-center items-center" type="button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                viewBox="0 0 20 20"
                fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-lg ml-1">Love</span>
            </button>
          </div>
          <div className="w-[50%]">
            <button className="w-full flex justify-center items-center" type="button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                />
              </svg>
              <span className="text-lg ml-1">comment</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostList;
