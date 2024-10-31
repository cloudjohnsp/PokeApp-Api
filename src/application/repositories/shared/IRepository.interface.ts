export interface IRepository<T> {
  create(entity: T): Promise<void>;
  update(entity: T): Promise<void>;
}
