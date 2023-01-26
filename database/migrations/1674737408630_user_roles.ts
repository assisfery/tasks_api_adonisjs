import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {

      table.integer('role')
        .nullable()
        .defaultTo(0)
        .comment("0 - Technician, 1 - Manager")

    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
