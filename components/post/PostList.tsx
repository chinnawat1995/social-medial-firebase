import { useAuthContext } from '@/context/AuthContext';
import { LoverCollection } from '@/lib/firebase/Firestore';
import Post from '@/lib/firebase/types/Post';
import { setDoc } from 'firebase/firestore';
import Image from 'next/image';
import { FC } from 'react';

interface Props {
  posts?: Post[];
}

const PostList: FC<Props> = (prop: Props) => {
  const authUser = useAuthContext();

  // const handleLove = () => {
  //   setDoc(LoverCollection, {
  //     uid: authUser?.user?.uid,
  //   });
  // };

  return (
    <div className="grid grid-cols-1 gap-y-3">
      {prop.posts?.map((post, index) => (
        <div key={`post-list-${index}`} className="w-full border border-gray-100 rounded-lg">
          <div className="flex p-2">
            <img className="w-7 h-7 rounded-full mr-2" src={post.user.image} alt="" />
            <span>{post.user.name}</span>
          </div>
          <div className="my-3 px-2">{post.text}</div>
          <div className="w-full relative unset-position-img ">
            <Image
              src={post.image}
              layout="fill"
              placeholder="blur"
              objectFit="contain"
              className="!w-full !h-[auto] !relative"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM8dvDgGQAHswMWce9rIgAAAABJRU5ErkJggg=="
            />
          </div>
          <div className="grid grid-cols-2 p-3">
            <div>
              <button className="w-full flex justify-center" type="button">
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
                <span onClick={handleLove} className="text-lg ml-1">Love</span>
              </button>
            </div>
            <div>
              <button className="w-full flex justify-center" type="button">
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
      ))}
    </div>
  );
};

export default PostList;
