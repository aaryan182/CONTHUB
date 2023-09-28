import React, { useState, useEffect } from 'react';
import './ContactForm.css';
import Notification from './Notification';

const ContactForm = ({ onAdd, onEdit, editingContact, setEditingContact, notificationMessage, notificationType }) => {
    const initialFormData = {
        name: '',
        phone: '',
        email: '',
    };

    const [formData, setFormData] = useState(initialFormData);
    const [phoneError, setPhoneError] = useState(false);
    const [showNotification, setShowNotification] = useState(false);


    useEffect(() => {
        if (editingContact) {
            setFormData(editingContact);
        }
    }, [editingContact]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleEmailFocus = () => {
        if (formData.email === '') {
            setFormData({
                ...formData,
                email: '@gmail.com',
            });
        }
    };

    const handleEmailBlur = () => {
        if (formData.email === '@gmail.com') {
            setFormData({
                ...formData,
                email: '',
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.name.trim() === '' || formData.phone.trim() === '' || formData.email.trim() === '') {
            return;
        }

        if (isNaN(formData.phone)) {
            setPhoneError(true);
            return;
        } else {
            setPhoneError(false);
        }

        if (editingContact) {
            onEdit(formData);
            setEditingContact(null);
        } else {
            onAdd({ ...formData, id: Date.now() });
        }

        setFormData(initialFormData);
        setShowNotification(true);
        setTimeout(() => {
            setShowNotification(false);
        }, 3000);

    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="contact-form">
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name " className="form-input" />
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className={`form-input ${phoneError ? 'error' : ''}`} />
                {phoneError && <p className="error-message">Please enter a valid phone number.</p>}
                <input type="email" name="email" value={formData.email} onChange={handleChange} onFocus={handleEmailFocus} onBlur={handleEmailBlur} placeholder="Email" className="form-input email-input" />
                <button type="submit" className="submit-btn"> {editingContact ? 'Save Changes' : 'Save Contact  📲'}</button>
            </form>
            {showNotification && (<Notification message="Contact saved successfully!" type="success" className={showNotification ? '' : 'hide'} />)}
        </div>
    );
};

export default ContactForm;
