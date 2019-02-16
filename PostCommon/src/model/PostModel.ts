export class PostModel {
  title: string;
  body: string;
  _id?: string;

  constructor(title: string, body: string) {
    this.title = title;
    this.body = body;
  }
};