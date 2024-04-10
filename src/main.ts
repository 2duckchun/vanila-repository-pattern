import { PostRepository } from "./modules/post/post-repository";

class UI {
  async drawPostListUI() {
    const getPostData = async () => {
      const result = await new PostRepository().getPostList();
      return result;
    };

    const data = await getPostData();

    document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
    <h1>리포지토리 패턴 실습</h1>
    <div>
      ${
        Array.isArray(data) &&
        data.map((el) => {
          return `
          <section style='border: 3px solid teal'>
            <div>${el.userId}</div>
            <div>${el.title}</div>
            <div>${el.content}</div>
          </section>
          `;
        })
      }
    </div>
  `;
  }
}

new UI().drawPostListUI();
