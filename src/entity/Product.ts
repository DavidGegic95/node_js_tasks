import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { v4 } from "uuid";

@Entity()
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string = v4();

  @Column()
  title: string = "";

  @Column()
  description: string = "";

  @Column("decimal", { precision: 10, scale: 2 })
  price: number = 0;
}
