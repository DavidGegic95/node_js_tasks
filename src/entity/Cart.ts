import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Product } from "./Product";

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn("uuid")
  _id: string = uuid();

  @ManyToOne(() => Product)
  @JoinColumn()
  product: Product | undefined;

  @Column()
  count: number = 0;
}

@Entity()
export class Cart {
  @PrimaryGeneratedColumn("uuid")
  _id: string = uuid();

  @Column()
  userId: string = "";

  @Column({ default: false })
  isDeleted: boolean = false;

  @ManyToOne(() => CartItem, { cascade: true, eager: true })
  @JoinColumn()
  items: CartItem[];
}
