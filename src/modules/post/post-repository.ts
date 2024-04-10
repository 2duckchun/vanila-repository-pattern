import { PostDatasource } from "./post-datasource";

interface IPostRepository {
  getPostList(): Promise<Post[] | FetchErrorMessage>;
}

export class PostRepository implements IPostRepository {
  private readonly datasource: PostDatasource;
  constructor(private readonly token?: string, datasource?: PostDatasource) {
    this.datasource = datasource ?? new PostDatasource(token);
  }

  async getPostList() {
    try {
      const result = await this.datasource.getPostList();
      return this.PostDTOParser(result);
    } catch (error) {
      return {
        message: "getPostList에 문제가 생겼습니다.",
        status: 500, // 백엔드와 이야기해서 합의한 status를 error에서 받을 수 있음.
      };
    }
  }

  PostDTOParser = (data: PostDTO[]): Post[] => {
    return data.map((el) => ({
      userId: el.userId,
      postId: el.id,
      title: el.title,
      content: el.body,
    }));
  };
}
