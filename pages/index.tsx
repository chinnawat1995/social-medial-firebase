import type { NextPage } from 'next';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import PostList from '@/components/post/PostList';
import { PostCollection } from '@/lib/firebase/Firestore';
import { uploadFile } from '@/lib/firebase/Storage';
import Post from '@/lib/firebase/types/Post';
import { CompressImage } from '@/lib/utils';
import { addDoc, onSnapshot } from 'firebase/firestore';
import { useAuthContext } from '@/context/AuthContext';

const Home: NextPage = () => {
  const user = useAuthContext();

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const [image, setImage] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const autoHeight = async (event: FormEvent<HTMLTextAreaElement>) => {
    if (null !== textareaRef.current) {
      //auto height textarea
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + 'px';
    }

    setText(event.currentTarget.value);
  };

  const handlePost = async () => {
    const copyText = text;
    const copyImage = image;

    setImage('');
    setText('');

    await addDoc(PostCollection, {
      text: copyText,
      image: copyImage,
      user: {
        name: user?.user?.displayName,
        image: user?.user?.photoURL || 'https://i.pravatar.cc/150',
      },
    });
  };

  const uploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      setLoading(true);

      const file: File = event.target.files[0];

      const getFile = async (newFile: File) => {
        const url = await uploadFile(newFile);

        setImage(url);

        setLoading(false);
      };

      CompressImage({ file, getFile });
    }
  };

  useEffect(() => {
    onSnapshot(PostCollection, (snapShort) => {
      const data = snapShort.docs.map((doc) => doc.data());

      setPosts(data);
    });
  }, [setPosts]);

  return (
    <>
      <div className="grid grid-cols-1 mb-5 ">
        <div className="border-x border-t border-gray-100 rounded-t-md p-2">
          <textarea
            className="w-[100%] py-2 px-3 appearance-none focus:outline-none resize-none"
            name="text"
            ref={textareaRef}
            placeholder="Post your feel or write your idea."
            value={text}
            onInput={(e) => {
              autoHeight(e);
            }}
          />
        </div>
        <div className={`w-full relative`}>
          <div
            className={`absolute w-full h-full bg-black bg-opacity-30 z-10 ${
              !loading && 'hidden'
            }`}>
            <div className="absolute inset-2/4">
              <svg
                role="status"
                className="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-400 fill-blue-400"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            </div>
          </div>
          {/* Display image after uploaded */}
          {image && (
            <div className="w-full h-[650px] relative">
              <button
                className="bg-slate-700 bg-opacity-40 rounded-full p-1 hover:bg-opacity-80 absolute top-2 right-2 z-10"
                onClick={() => setImage('')}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 fill-white"
                  viewBox="0 0 20 20"
                  fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <Image
                src={image}
                layout="fill"
                objectFit="contain"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM8dvDgGQAHswMWce9rIgAAAABJRU5ErkJggg=="
              />
            </div>
          )}
        </div>
        <div className="flex justify-between border-x border-b rounded-b-md border-gray-100 p-2">
          <div className="flex items-center">
            <label htmlFor="upload-image">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 hover:stroke-blue-800 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </label>
            <input
              id="upload-image"
              type="file"
              hidden
              onChange={(e) => uploadImage(e)}
              accept=".gif,.jpg,.jpeg,.png"
            />
          </div>
          <button
            className="px-4 py-2 bg-blue-800 hover:bg-blue-900 text-sm text-white rounded-md"
            onClick={handlePost}>
            Post
          </button>
        </div>
      </div>

      <PostList posts={posts} />
    </>
  );
};

export default Home;
