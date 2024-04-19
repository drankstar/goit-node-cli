import * as fs from "node:fs/promises"
import * as path from "node:path"

const contactsPath = path.resolve("src", "db", "contacts.json")

async function readFile() {
  const data = await fs.readFile(contactsPath, { encoding: "utf-8" })
  return JSON.parse(data)
}

async function writeFile(data) {
  await fs.writeFile(contactsPath, JSON.stringify(data, undefined, 2), {
    encoding: "utf-8",
  })
}

async function listContacts() {
  const data = readFile()
  return data
}

async function getContactById(contactId) {
  const data = await readFile()
  return data.find((contact) => contactId === contact.id)
}

async function removeContact(contactId) {
  const data = await readFile()

  const index = data.findIndex((contact) => contactId === contact.id)

  if (index === -1) {
    return null
  }

  const removedContact = data.splice(index, 1)
  await writeFile(data)
  return removedContact
}

async function addContact(name, email, phone) {
  const contact = { name, email, phone, id: crypto.randomUUID() }
  const data = await readFile()
  const newData = [...data, contact]
  await writeFile(newData)
  return contact
}
export default { listContacts, getContactById, removeContact, addContact }
