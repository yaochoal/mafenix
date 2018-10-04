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

    public Contact getContactByCode(long code){
        return entityManager.find(Contact.class, code);
    }

    public void createContact(Contact contact) {
        entityManager.persist(contact);
    }

    public Contact updateContact(long code, Contact contact) {
        Contact contactToUpdate = entityManager.find(Contact.class, code);
        contactToUpdate.setName(contact.getName());
        contactToUpdate.setCredits(contact.getCredits());
        return entityManager.merge(contactToUpdate);
    }

    public void deleteContact(long code) {
        Contact contact = entityManager.find(Contact.class, code);
        entityManager.remove(contact);
    }
}
