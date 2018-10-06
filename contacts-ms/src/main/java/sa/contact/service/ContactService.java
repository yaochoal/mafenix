package sa.contact.service;

import sa.contact.model.Contact;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;

@Stateless
public class ContactService {

    @PersistenceContext
    EntityManager entityManager;

    public List<Contact> getAllContacts(int first, int maxResult) {
        return entityManager.createNamedQuery(Contact.FIND_ALL)
                .setFirstResult(first).setMaxResults(maxResult).getResultList();
    }

    public Contact getContactById(long id){
        return entityManager.find(Contact.class, id);
    }

    public void createContact(Contact contact) {
        entityManager.persist(contact);
    }

    public Contact updateContact(long id, Contact contact) {
        Contact contactToUpdate = entityManager.find(Contact.class, id);
        contactToUpdate.setName(contact.getName());
        contactToUpdate.setLastName(contact.getLastName());
        contactToUpdate.setEmail(contact.getEmail());
        contactToUpdate.setSubject(contact.getSubject());
        contactToUpdate.setMessage(contact.getMessage());
        return entityManager.merge(contactToUpdate);
    }

    public void deleteContact(long id) {
        Contact contact = entityManager.find(Contact.class, id);
        entityManager.remove(contact);
    }
}
