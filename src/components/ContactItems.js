import React from 'react';
import './ContactItems.css'

const ContactItem = ({ contact, onDelete, onEdit }) => {
    const handleDelete = () => {
        onDelete(contact.id);
    };

    const handleEdit = () => {
        onEdit(contact);
    };

    return (
        <div className="contact-card">
            <h3 className="contact-name">{contact.name}</h3>
            <p className="contact-info">{contact.phone}</p>
            <p className="contact-info">{contact.email}</p>
            <div className="btn-group">
                <button className="edit-btn" onClick={handleEdit}> Edit ✎ </button>
                <button className="delete-btn" onClick={handleDelete}> Delete ❌ </button>
            </div>
        </div>
    );
};

export default ContactItem;
