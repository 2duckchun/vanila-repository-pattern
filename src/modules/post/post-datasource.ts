interface IPostDatasource {
  getPostList(): Promise<PostDTO[]>;
}

export class PostDatasource implements IPostDatasource {
  private readonly token?: string;
  constructor(token?: string) {
    this.token = token;
  }

  async getPostList(): Promise<PostDTO[]> {
    try {
      // fetch 실행
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
          cache: "no-store",
        }
      );

      // fetch는 성공했으나, 응답이 ok가 아닐 경우
      if (!response.ok) throw new Error("postDatasourse is NOT 200");

      // fetch에 성공했고 응답도 ok인 경우 받아온 데이터를 그대로 반환
      const result: PostDTO[] = await response.json();
      return result;
    } catch (error) {
      // fetch 자체에서 에러가 날 경우
      // 에러를 그대로 리턴해줘도 repository에서 캐치해낸다.
      console.error("🐜PostDatasource ERROR: ", error);
      throw error;

      // 또는 필요에 따라 에러 생성자로 에러메세지를 새롭게 만들어도 된다.
      // throw new Error("에러가 났어요~")
    }
  }
}
