import { column, defineDb, defineTable } from 'astro:db'

const User = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    email: column.text(),
    password: column.text()
  }
})

const Link = defineTable({
  columns: {
    url: column.text(),
    slug: column.text({ unique: true }),
    userId: column.number({ references: () => User.columns.id })
  }
})

// https://astro.build/db/config
export default defineDb({
  tables: {
    User,
    Link
  }
})
