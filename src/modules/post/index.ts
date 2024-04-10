type PostDTO = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type Post = {
  userId: number;
  postId: number;
  title: string;
  content: string;
};

type FetchErrorMessage = {
  message: string;
  status: number;
};
