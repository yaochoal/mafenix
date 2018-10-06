package sa.contact.model;

import javax.persistence.*;

@Entity
@Table(name = "contacts")
@NamedQueries({@NamedQuery(name = Contact.FIND_ALL, query = "SELECT u FROM Contact u")})
public class Contact {

    public static final String FIND_ALL = "Contact.findAll";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String lastName;
    private String email;
    private String subject;
    private String message;

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getName(){
      return name;
    }
    public void setName(String name){
      this.name = name;
    }
    public String getLastName(){
      return lastName;
    }
    public void setLastName(String lastName){
      this.lastName = lastName;
    }
    public String getEmail(){
      return email;
    }
    public void setEmail(String email){
      this.email = email;
    }
    public String getSubject(){
      return subject;
    }
    public void setSubject(String subject){
      this.subject = subject;
    }
    public String getMessage(){
      return message;
    }
    public void setMessage(String message){
      this.message = message;
    }
}