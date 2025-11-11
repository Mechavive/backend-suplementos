export class Category {
  constructor(
    private category_id: number,
    private name: string,
    private description: string,
  ) {}

  // GETTERS
  public getCategoryId(): number {
    return this.category_id;
  }

  public getName(): string {
    return this.name;
  }

  public getDescription(): string {
    return this.description;
  }

  //SETTERS
  public setCategoryId(id: number): void {
    if (id <= 0) {
      throw new Error('Id cant be lower than 0');
    }
    this.category_id = id;
  }

  public setName(name: string): void {
    if (name === '') {
      throw new Error('Name must contain a character');
    }

    this.name = name;
  }

  public setDescription(description: string): void {
    if (description === '') {
      throw new Error('Description must contain a character');
    }

    this.description = description;
  }

  public toJSON() {
    return {
      category_id: this.category_id,
      name: this.name,
      description: this.description,
    };
  }
}
