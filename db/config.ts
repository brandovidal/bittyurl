import { column, defineDb, defineTable } from 'astro:db'

const User = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    name: column.text(),
    email: column.text(),
    createAt: column.date({ default: new Date() }),
  }
})

const Link = defineTable({
  columns: {
    url: column.text(),
    slug: column.text({ unique: true }),
    createAt: column.date({ default: new Date() }),
    clicks: column.number({ default: 0 }),
    userId: column.number({
      optional: true,
      references: () => User.columns.id
    })
  }
})

// https://astro.build/db/config
export default defineDb({
  tables: {
    User,
    Link
  }
})
