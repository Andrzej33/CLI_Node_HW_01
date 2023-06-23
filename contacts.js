const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

const contactsPath = path.join(__dirname, "/db/contacts.json");

async function listContacts() {
  const contactsList = await fs.readFile(contactsPath);
 

  return JSON.parse(contactsList);
}

async function getContactById(id) {
  const idContact = String(id);
  const contacts = await listContacts();
  const contactById = contacts.find((contact) => contact.id === idContact);

  return contactById || null;
}

async function removeContact(id) {
  const idContact = String(id);
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === idContact);
  if (index === -1) {
    return null;
  }

  const result = contacts.splice(index, 1);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}

async function addContact(data) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return newContact;
}
