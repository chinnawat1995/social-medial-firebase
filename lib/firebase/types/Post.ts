export default interface Post {
    text: string;
    image: string;
    user: {
      name: string | null | undefined;
      image?: string;
    }
  }
  