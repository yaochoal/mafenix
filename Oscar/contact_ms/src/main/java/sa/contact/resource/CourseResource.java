package sa.contact.resource;

import sa.contact.model.Contact;
import sa.contact.service.ContactService;

import javax.ejb.EJB;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;
import java.net.URI;
import java.util.List;

@Path("/contact")
public class ContactResource {

    @Context
    UriInfo uriInfo;

    @EJB
    ContactService contactService;

    @GET
    public List<Contact> getAllContact(@QueryParam("first") int first, @QueryParam("maxResult") int maxResult) {
        return contactService.getAllContact(first, maxResult);
    }

    @GET
    @Path("{code}")
    public Contact getContactById(@PathParam("id") long id) {
        return contactService.getContactById(id);
    }

    @POST
    public Response createContact(Contact contact) {
        contactService.createContact(contact);
        return Response.status(Response.Status.CREATED).build();
    }

    @PUT
    @Path("{id}")
    public Response updateContact(@PathParam("id") long id, Contact contact) {
        contactService.updateContact(id, contact);
        return Response.status(Response.Status.NO_CONTENT).build();
    }

    @DELETE
    @Path("{id}")
    public Response deleteContact(@PathParam("id") long id) {
        contactService.deleteContact(id);
        return Response.status(Response.Status.OK).build();
    }

}
