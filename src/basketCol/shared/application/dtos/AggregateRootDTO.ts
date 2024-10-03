interface IAuditableEntity {
  createdAt: string;
  updatedAt: string;
}

export interface AggregateRootDTO extends IAuditableEntity {
  id: string;
}
