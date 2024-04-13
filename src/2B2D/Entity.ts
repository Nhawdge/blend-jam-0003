export type Entity = number;

export class ResolvableEntity {
  entity: Entity | undefined = undefined;

  resolve(entity: Entity) { this.entity = entity; }
  isResolved() { return this.entity !== undefined; }

  static Resolved(entity:Entity) {
    const t = new ResolvableEntity();
    t.resolve(entity);
    return t;
  }
}
