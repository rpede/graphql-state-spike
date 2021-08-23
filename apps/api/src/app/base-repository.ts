export abstract class BaseRepository<T extends {id: number}> {
  protected entities: T[] = [];

  find(id: number) {
    return this.entities.find(entity => entity.id === id);
  }

  all() {
    return [...this.entities];
  }

  count() {
    return this.entities.length;
  }

  add(entity: T) {
    this.entities.push(entity)
    return entity;
  }

  replace(entity: T) {
    const index = this.entities.findIndex(oldEntity => oldEntity.id === entity.id);
    this.entities[index] = entity;
    return entity;
  }
}
