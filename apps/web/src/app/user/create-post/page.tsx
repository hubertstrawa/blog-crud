// import CreatePostContainer from "./_components/CreatePostContainer";
// import UpsertPostForm from "./_components/upsertPostForm";

import CreatePostContainer from "./_components/CreatePostContainer";

const CreatePostPage = () => {
  return (
    <div className="bg-white ring-1 ring-black/5 shadow-sm rounded-3xl p-8 max-w-2xl w-full">
      <h2 className="text-2xl text-center font-semibold tracking-tight text-gray-900 mb-6">
        Create a New Post
      </h2>
      {/* <CreatePostContainer /> */}
      <CreatePostContainer />
    </div>
  );
};

export default CreatePostPage;
