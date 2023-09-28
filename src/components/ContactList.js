import React, { useState } from 'react';
import ContactItem from './ContactItems';
import ContactForm from './ContactForm';
import Notification from './Notification';
import './ContactList.css';

const ContactList = () => {
    const [contacts, setContacts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('name');
    const [editingContact, setEditingContact] = useState(null);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [notificationType, setNotificationType] = useState('');


    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSort = (event) => {
        setSortBy(event.target.value);
    };

    const addContact = (newContact) => {
        setContacts([...contacts, newContact]);
    };

    const editContact = (editedContact) => {
        const updatedContacts = contacts.map((contact) =>
            contact.id === editedContact.id ? editedContact : contact
        );
        setContacts(updatedContacts);
    };

    const editSelectedContact = (contact) => {
        setEditingContact(contact);
        setNotificationMessage('');
        setNotificationType('');
    };

    const deleteContact = (id) => {
        const updatedContacts = contacts.filter((contact) => contact.id !== id);
        setContacts(updatedContacts);
    };

    const filteredContacts = contacts.filter(
        (contact) =>
            contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contact.phone.includes(searchTerm) ||
            contact.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedContacts = filteredContacts.sort((a, b) => {
        if (sortBy === 'name') {
            return a.name.localeCompare(b.name);
        } else if (sortBy === 'phone') {
            return a.phone.localeCompare(b.phone);
        } else {
            return a.email.localeCompare(b.email);
        }
    });

    const handleEditContact = (editedContact) => {
        editContact(editedContact);
        setEditingContact(null);
        setNotificationMessage('Contact edited successfully!');
        setNotificationType('info');
        setTimeout(() => {
            setNotificationMessage('');
        }, 3000);
    };

    const handleDeleteContact = (id) => {
        deleteContact(id);
        setNotificationMessage('Contact deleted successfully!');
        setNotificationType('danger');
        setTimeout(() => {
            setNotificationMessage('');
        }, 3000);
    };

    return (
        <div className="container">
            <div className="search-sort-container">
                <input
                    type="text"
                    placeholder="Search contacts...🔍"
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <select value={sortBy} onChange={handleSort}>
                    <option value="name">Name</option>
                    <option value="phone">Phone</option>
                    <option value="email">Email</option>
                </select>
            </div>
            <div className="ContactCardWrapper">
                {sortedContacts.map((contact) => (
                    <div key={contact.id}>
                        <ContactItem contact={contact} onDelete={() => handleDeleteContact(contact.id)} onEdit={() => editSelectedContact(contact)} />
                    </div>
                ))}
            </div>
            <div className="ContactForm">
                <ContactForm onAdd={addContact} onEdit={handleEditContact} editingContact={editingContact} setEditingContact={setEditingContact} notificationMessage={notificationMessage}
                    notificationType={notificationType} />
            </div>
            {notificationMessage && ( <Notification message={notificationMessage} type={notificationType} />)}
        </div>

    );
};

export default ContactList;
