import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class Order {
  @PrimaryGeneratedColumn("uuid")
  _id: string = "";

  @Column()
  userId: string = "";

  @Column()
  cartId: string = "";

  @Column("jsonb", { array: true })
  items: object[] = [];

  @Column("jsonb")
  payment:
    | {
        type: string | "";
        address?: any;
        creditCard?: any;
      }
    | undefined;

  @Column("jsonb")
  delivery:
    | {
        type: string;
        address: any;
      }
    | undefined;

  @Column({ nullable: true })
  comments: string = "";

  @Column()
  status: string = "";

  @Column("decimal", { precision: 10, scale: 2 })
  total: number = 0;
}
