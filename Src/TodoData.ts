export class TodoData {
  constructor(readonly id: number, readonly title: string, readonly description: string, readonly progress: number) {}

  static empty(): TodoData {
    const now = new Date();
    return new TodoData(now.getTime(), `Title-${now.getTime()}`, `Description-${now.getTime()}`, 0);
  }

  static with(todo?: TodoData): TodoData {
    if (todo !== undefined) {
      return new TodoData(todo.id, todo.title, todo.description, todo.progress);
    } else {
      return this.empty();
    }
  }
}
