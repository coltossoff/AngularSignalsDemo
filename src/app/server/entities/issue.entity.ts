import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Issue {
    @PrimaryKey()
    _id!: number;

    @Property()
    createdAt = new Date();

    @Property({ nullable: false })
    title!: string;

    @Property({ nullable: true })
    descr: string | undefined;
}