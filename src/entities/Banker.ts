import { 
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable
} from "typeorm"
import { Client } from "./Client";
import { Person } from "./utils/Person";

@Entity('banker')
// extends Person to take those fields in Banker entity
export class Banker extends Person {
  @Column({
    unique: true,
    length: 10
  })
  employee_number: string;

  // ManyToMany Basically creates a new table with a relation of two other tables
  // NOTE: First Many = current entity second Many = Target entity
  @ManyToMany(
    () => Client
  )
  @JoinTable({
    name: "bankers_clients",
    // First field column
    joinColumn: {
      // column name and reference
      name: "banker",
      referencedColumnName: "id"
    },

    // Second field column
    inverseJoinColumn: {
      // column name and reference
      name: "client",
      referencedColumnName: "id"
    }
  })
  clients: Client[]

  // CreateDateColumn, every time a record is created, insert a create_at date
  @CreateDateColumn()
  created_at: Date;

  // UpdateColumn, every time a record is updated, update updated_at field
  @UpdateDateColumn()
  updated_at: Date;
}

// MANY TO MANY RELATION EXAMPLE
// client_id banker_id
//      1        3