import { program } from "commander"
import Contacts from "./src/contacts.js"
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone")

program.parse()

const options = program.opts()

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contactsList = await Contacts.listContacts()
      console.log(contactsList)
      break

    case "get":
      const contact = await Contacts.getContactById(id)
      console.log(contact)
      break

    case "add":
      const newContact = await Contacts.addContact(name, email, phone)
      console.log(newContact)
      break

    case "remove":
      const removedContact = await Contacts.removeContact(id)
      console.log(removedContact)
      break

    default:
      console.warn("\x1B[31m Unknown action type!")
  }
}

invokeAction(options)
